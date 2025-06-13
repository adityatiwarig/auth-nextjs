"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; //  Toast import

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false); // 2 input fill hone ke baad login allow
    const [loading, setLoading] = React.useState(false); // jab login chal raha ho

    const onLogin = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/login", user);

            console.log("Login success", response.data);
            
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]); // dependency user pe

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
            <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Toast yahan show hoga */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl text-white">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {loading ? "Processing..." : "Login"}
                </h1>
                <hr className="mb-6 border-gray-500" />

                <label htmlFor="email" className="block mb-1 text-sm">
                    email
                </label>
                <input
                    className="w-full p-3 mb-4 rounded-xl border border-gray-500 bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />

                <label htmlFor="password" className="block mb-1 text-sm">
                    password
                </label>
                <input
                    className="w-full p-3 mb-6 rounded-xl border border-gray-500 bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />

                <button
                    onClick={onLogin}
                    className={`w-full p-3 mb-4 rounded-xl font-semibold transition-all duration-300 ${
                        buttonDisabled
                            ? "bg-gray-700 cursor-not-allowed text-gray-400"
                            : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                    }`}
                >
                    {buttonDisabled ? "No Login" : "LOGIN.."}
                </button>

                <Link
                    href="/signup"
                    className="block text-center text-sm text-blue-400 hover:underline"
                >
                    Visit Signup page
                </Link>
            </div>
        </div>
    );
}
