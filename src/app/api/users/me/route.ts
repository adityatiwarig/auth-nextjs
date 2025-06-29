import { getDataFromToken } from "@/helper/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);  // data.id leliya db se

        const user = await User.findOne({_id: userId}).select("-password"); // id lelo and pass nai

        return NextResponse.json({    // USER MIL GYA 
            message: "User found",
            data: user          // id , username aur email meilga data me user ka
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}