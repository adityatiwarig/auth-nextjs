import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connect()


export async function POST(request: NextRequest){     // KHUD SE DALNA HAI
    try {
        const reqBody = await request.json();        // REQBODY SE HI DATA NIKLEGA
        const {username, email, password} = reqBody;

        // console.log(reqBody);
                

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)   // express aur typescript me 10 hi rounds 
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // console.log(savedUser);

        //send verification email


        return NextResponse.json({           // FINAL RESPONSE BHEJNA HAI
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}