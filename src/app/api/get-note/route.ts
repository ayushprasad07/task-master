import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";



export async function GET(req : Request){
    await dbConnect()


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

    const userId = user._id;


    try {
        const user = await UserModel.aggregate([
            {$match:{
                _id : userId
            }},
            { $unwind : {path : "$notes" , preserveNullAndEmptyArrays : true}},
            {
                $sort : {"notes.createdAt" : -1}
            },
            {
                $group : {
                    _id : "$_id",
                    notes : {$push : "$notes"}
                }
            }
        ])

        if(!user || user.length===0){
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            })
        }

        return Response.json({success : true,message : "Notes fetched successfully",notes : user[0].notes},{status : 200});
    } catch (error) {
        console.log("Error while getting notes",error);
        return Response.json({success : false,message : "Error while getting notes"},{status : 500});
    }
}