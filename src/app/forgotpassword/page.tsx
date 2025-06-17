"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");          // INPUT WALA EMAIL STORE
  const [error, setError] = useState("");          // AGR API FAIL TO ERROR SHOW
  const [loading, setLoading] = useState(false);   // JAB TK RES AARHA HAI TBTK PROCESSING SHOW
  const [sentEmail, setSentEmail] = useState(false);  // AGR API WORK THEN TO SHOW EMAIL SENT CONFIRMATION

  const handleClick = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/forgotPassword", { email });   // EMAIL MATCH KRO BACKEND SE
      setSentEmail(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex bg-gray-600 flex-col justify-evenly align-middle h-screen ">
      {sentEmail ? (
        <div>
          <p className="text-xl text-center">
            Reset Password Email sent successfully!!
          </p>
        </div>
      ) : (
        <div className="flex flex-col bg-gray-600 items-center justify-center min-h-screen py-2">
          <p className="text-center p-2">{loading ? "Processing..." : ""}</p>
          {error ? (
            <h3 className="text-center m-2 text-red-500">{error}</h3>
          ) : null}
          <div className="flex flex-col justify-center">
            <h1 className="m-2 text-xl">Send Password Recovery Email</h1>
            <div className="flex flex-col justify-evenly w-[400px] border border-white p-6 rounded-2xl">
             
              <label></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                placeholder="Email..."
              />
              <button
                onClick={handleClick}
                className="p-2 w-full border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                Send password recovery email
              </button>
            </div>
            <Link className="text-center hover:underline m-2" href="/login">
              Login Instead
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;  // ✅ Yeh line fix ki gayi hai
