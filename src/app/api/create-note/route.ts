import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { Note } from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";    
import mongoose from "mongoose";


export async function POST(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "Not authenticated"
        },{
            status : 401
        })
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const { title, description} = await request.json();

        const user = await UserModel.findById(userId);

        if(!user){
            return Response.json({success : false,message : "User not found"},{status : 404});
        }

        if(!user.isVerified){
            return Response.json({success : false,message : "User is not verified. Verify your email."},{status : 401});
        }


        const note : Note = {
            title,
            description,
            createdAt : new Date()
        }

        user.notes.push(note);
        await user.save();

        return Response.json({success : true,message : "Note created successfully"},{status : 200});
    } catch (error) {
        console.log("Error while creating note",error);
        return Response.json({success : false,message : "Error while creating note"},{status : 500});
    }
}