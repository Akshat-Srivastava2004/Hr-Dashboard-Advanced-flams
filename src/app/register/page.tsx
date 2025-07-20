'use client';
import { useState } from 'react';
import { users } from '../lib/user';
import { useRouter } from 'next/navigation';
export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const router = useRouter()


    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        users.push(formData);
        router.push('/login');
    };

    return (
        <div className="bg-green-100 dark:bg-gray-800 h-screen">
            <div className="container mx-auto px-6 py-8">
                <h2 className="text-4xl font-bold text-center text-green-800 dark:text-white mb-8">
                     Register to Hr Dashborad  Website!
                </h2>
                <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl text-green-800 dark:text-white font-bold">
                            Create an account and stay connected!
                        </h3>
                        <p className="text-green-600 dark:text-gray-400 mt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eveniet autem delectus molestias hic blanditiis illo?
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 mt-8 md:mt-0">
                        <form
                            onSubmit={handleRegister}
                            className="bg-white dark:bg-gray-900 rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-green-700 dark:text-gray-200 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border border-green-500 dark:border-gray-700 rounded w-full py-2 px-3 text-green-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-green-700 dark:text-gray-200 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border border-green-500 dark:border-gray-700 rounded w-full py-2 px-3 text-green-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
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
                                    Register
                                </button>
                                <a
                                    className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 dark:text-gray-200 dark:hover:text-gray-400"
                                    href="/login"
                                >
                                    Already have an account?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
