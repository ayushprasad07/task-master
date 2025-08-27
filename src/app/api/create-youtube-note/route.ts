import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { YouTube } from "@/model/User";
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
        const { title, description, url} = await request.json();
        const user = await UserModel.findOne(userId);

        if(!user){
            return Response.json({success : false,message : "User not found"},{status : 404});
        }

        if(!user.isVerified){
            return Response.json({success : false,message : "User is not verified. Verify your email."},{status : 401});
        }

        const youtubeNote : YouTube = {
            title,
            description,
            url,
            preview : `https://img.youtube.com/vi/${url.split('&')[0].split('=')[1]}/hqdefault.jpg`,
            createdAt : new Date()
        }

        user.youtubes.push(youtubeNote);

        await user.save();
        
        return Response.json({success : true,message : "YouTube note created successfully"},{status : 200});
    } catch (error) {
        console.log("Error while creating youtube note",error);
        return Response.json({success : false,message : "Error while creating youtube note"},{status : 500});
    }
}
