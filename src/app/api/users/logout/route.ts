import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful..",
            success: true,
        });

        
        response.cookies.set("token", "", {    // token naam wali cookie ko expire kro
            httpOnly: true,
            expires: new Date(0),             // abhi expire kro
            
        });


        return response;   // message and success

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
