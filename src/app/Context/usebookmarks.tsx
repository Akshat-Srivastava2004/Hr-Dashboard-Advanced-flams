"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
interface BookmarkedEmployee {
  id: number
  name: string
  email: string
  department: string
  rating: number
  bookmarkedAt: string
}

interface BookmarkContextType {
  bookmarks: BookmarkedEmployee[]
  addBookmark: (emp: Omit<BookmarkedEmployee, "bookmarkedAt">) => void
  removeBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
  clearAllBookmarks: () => void
}


const BookmarkContext = createContext<BookmarkContextType | null>(null)


export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkedEmployee[]>([])


  useEffect(() => {
    const loadBookmarksFromStorage = () => {
      const saved = localStorage.getItem("employee-bookmarks")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setBookmarks(parsed)
        } catch (error) {
          console.error("Failed to parse bookmarks:", error)
        }
      }
    }

    loadBookmarksFromStorage()
  }, [])


  useEffect(() => {
    const saveBookmarksToStorage = () => {
      localStorage.setItem("employee-bookmarks", JSON.stringify(bookmarks))
    }

    saveBookmarksToStorage()
  }, [bookmarks])


  const addBookmark = (emp: Omit<BookmarkedEmployee, "bookmarkedAt">) => {
    const alreadyExists = bookmarks.some((b) => b.id === emp.id)
    if (alreadyExists) return

    const newBookmark: BookmarkedEmployee = {
      ...emp,
      bookmarkedAt: new Date().toISOString(),
    }

    setBookmarks((prev) => [...prev, newBookmark])
  }


  const removeBookmark = (id: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }


  const isBookmarked = (id: number): boolean => {
    return bookmarks.some((b) => b.id === id)
  }


  const clearAllBookmarks = () => {
    setBookmarks([])
  }

  const contextValue: BookmarkContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    clearAllBookmarks,
  }

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  )
}


export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error("useBookmarks must be used within a <BookmarkProvider>")
  }
  return context
}
