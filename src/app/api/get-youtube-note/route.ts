import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request : Request){
    await dbConnect()


    const session = await getServerSession(authOptions)
    const user : User = session?.user as User


    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "User not authenticated"
        },{
            status : 401
        })
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            {$match : {_id : userId}},
            { $unwind : {path : "$youtubes" , preserveNullAndEmptyArrays : true}},
            {
                $sort : {"youtubes.createdAt" : -1}
            },
            {
                $group : {
                    _id : "$_id",
                    youtubes : {
                        $push : "$youtubes"
                    }
                }
            }
        ])

        if(!user || user.length === 0){
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            })
        } 


        return Response.json({
            success : true,
            message : "Youtube Notes fetched Successfully",
            data : user[0].youtubes
        },{
            status : 200
        })
    } catch (error) {
        console.log("Error connecting to DB",error);
        return Response.json({
            success : false,
            message : "Error connecting to DB"
        },{
            status : 500
        })
    }
}