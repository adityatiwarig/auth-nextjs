import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()        // body me se req aise hi lete hai
        const {username, email, password} = reqBody

        console.log(reqBody);           // teno show kr dega

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)  // MANUALLY TRACK KRNE KE LIYE
        const hashedPassword = await bcryptjs.hash(password, salt)   // salt ke jaagah 10 krdo sidhe

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()     // ye save hoga db me
        console.log(savedUser);

        //send verification email

        try {
            await sendEmail({
                email,
                emailType: "VERIFY",       // SIGNUP KE TIME VERIFY BHEJA GYA ISILIYE AARHA HAI
                userId: savedUser._id
            });
        } catch (error) {
            console.error("Email sending failed:", error);  // Debug ke liye
            
        }

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}