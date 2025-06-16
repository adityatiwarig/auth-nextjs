"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast,Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({   // teno user me object bnake dale ho
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false); // 3 INPUT FILL KE BAAD SIGNUP ALLOW

    const [loading, setLoading] = React.useState(false); // DATA DALNE KE BAAD

    const onSignup = async () => {
        try {
            setLoading(true);    // loading show krne lgo click ke baad

            // AXIOS AUTOMATICALLY JSON PARSE KR DETA HAI FETCH KRTA  
            const response = await axios.post("/api/users/signup", user);  //USER SE REQ BHEJ RHA HAI

            console.log("Signup success");

            toast.success("Signup successful 🎉");

            router.push(`/login`);

        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]); // DEPENDENCIES USER PE DEPEND KREGI

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gradient-to-r from-gray-900 via-[#111827] to-gray-900">
            <Toaster position="top-right" reverseOrder={false} /> {/* Toast show yahi hoga top-right */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-600/40 rounded-2xl p-8 shadow-lg text-white">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {loading ? "Processing..." : "Signup"}         
                </h1>
                <hr className="mb-6 border-gray-500" />

                <label htmlFor="username" className="block mb-1 text-sm">
                    username
                </label>
                <input
                    className="w-full p-3 mb-4 rounded-xl border border-gray-500 bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value })}
                    placeholder="username"
                />

                <label htmlFor="email" className="block mb-1 text-sm">
                    email
                </label>
                <input
                    className="w-full p-3 mb-4 rounded-xl border border-gray-500 bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
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
                    className="w-full p-3 mb-4 rounded-xl border border-gray-500 bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />

                <button
                    onClick={onSignup}
                    className={`w-full p-3 mb-4 rounded-xl font-semibold transition-all duration-300 ${
                        buttonDisabled
                            ? "bg-gray-700 cursor-not-allowed text-gray-400"
                            : "bg-cyan-500 hover:bg-cyan-600 text-white shadow-md"
                    }`}
                >
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>

                <Link
                    href="/login"
                    className="block text-center text-sm text-cyan-400 hover:underline"
                >
                    Visit login page
                </Link>
            </div>
        </div>
    );
}
