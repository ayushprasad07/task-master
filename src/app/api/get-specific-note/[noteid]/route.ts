import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { UserModel } from "@/model/User";
import mongoose from "mongoose";


export async function GET(
    req : Request,
    context : {params : {noteid : string}}){

    const {noteid} =  await context.params;

    await dbConnect();

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "User not authenticated"
        },{
            status : 404
        })
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const note = await UserModel.aggregate([
            {$match : {_id : userId}},
            {$unwind : {path : "$notes" , preserveNullAndEmptyArrays : true}},
            {$match : {"notes._id" : new mongoose.Types.ObjectId(noteid)}},
            // {
            //     $project : {
            //         "notes.$" : 1
            //     }
            // }
        ])

        // console.log("Note",note)

        if(!note){
            return Response.json({
                success : false,
                message : "Note not found"
            },{
                status : 404
            })
        }

        return Response.json({
            success : true,
            message : "Note found",
            note : note[0].notes
        })
    } catch (error) {
        return Response.json({
            success : false,
            message : "User not found"
        },{
            status : 404
        })
    }
}