'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { users } from '../lib/user';
export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        if (user) {
            alert("Login successful!");
            router.push('/');
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 h-screen">
            <div className="container mx-auto px-6 py-8">
                <h2 className="text-4xl font-bold text-center text-green-800 dark:text-white mb-8">
                    Login to Hr Dashborad  Website!
                </h2>
                <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl text-green-800 dark:text-white font-bold">
                            Stay connected with us!
                        </h3>
                        <p className="text-green-600 dark:text-gray-400 mt-4">
                            Log in to manage employee records, view analytics, track promotions, and much more—all from your personalized dashboard.

                        </p>
                    </div>

                    <div className="w-full md:w-1/2 mt-8 md:mt-0">
                        <form
                            onSubmit={handleLogin}
                            className="bg-white dark:bg-gray-900 rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-green-700 dark:text-gray-200 text-sm font-bold mb-2"
                                    htmlFor="Email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border border-green-500 dark:border-gray-700 rounded w-full py-2 px-3 text-green-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Email"
                                    type="text"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    className="block text-green-700 dark:text-gray-200 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border border-green-500 dark:border-gray-700 rounded w-full py-2 px-3 text-green-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-green-500 hover:bg-green-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                                <a
                                    className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 dark:text-gray-200 dark:hover:text-gray-400"
                                    href="#"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
