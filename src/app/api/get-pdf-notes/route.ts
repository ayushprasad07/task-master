import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";


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
            {$match : {_id : userId}},
            { $unwind : {path : "$pdf" , preserveNullAndEmptyArrays : true}},
            {
                $sort : {"pdf.createdAt" : -1}
            },
            {
                $group : {
                    _id : "$_id",
                    pdf : {
                        $push : "$pdf"
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
            });
        }

        return Response.json({
            success : true,
            message : "Pdf notes fetched successfully",
            data : user[0].pdf
        },{
            status : 200
        });

    } catch (error) {
        console.log("Error while getting pdf notes",error);
        return Response.json({
            success : false,
            message : "Error while getting pdf notes"
        },{
            status : 500
        });
    }
}