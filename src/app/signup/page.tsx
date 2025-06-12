"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage(){
    const [user,setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    
    const onSignup = async() =>{

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <label htmlFor="email">Email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({...user , email: e.target.value})}
            placeholder="email"
            />

            <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user , password: e.target.value})}
            placeholder="password"
            />

            <label htmlFor="username">username</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="username"
            id="username"
            value={user.username}
            onChange={(e) => setUser({...user , username: e.target.value})}
            placeholder="username"
            />


            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/login">Visit Login page</Link>

        </div>
    )
}