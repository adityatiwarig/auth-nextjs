import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log("Request Body:", reqBody);

        // ✅ Check if user exists
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        console.log("User found:", user.email);


        // ..VERIFY KRO TBHI LOGIN HOGA
        if (!user.isVerified) {
            return NextResponse.json({ error: "Please verify your email before logging in." }, { status: 401 });
        }

        // ✅ Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // ✅ Create token payload
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // ✅ Create JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // ✅ Prepare and return response with token cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: tokenData,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
