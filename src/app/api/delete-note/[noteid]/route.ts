import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";
import { UserModel } from "@/model/User";


export async function DELETE(req: Request,
    {params} : {params : Promise<{noteid : string}>}
) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

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
        const {noteid} = await params;

        const noteId = new mongoose.Types.ObjectId(noteid);

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { $pull: { notes: { _id: noteId } } },
            { new: true } // returns the updated user
        );

        if(!updatedUser){
            console.log("User not found");
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            })
        }

        return Response.json({
            success : true,
            message : "Note deleted successfully"
        },{
            status : 200
        })


    } catch (error) {
        console.log("Error in deletion : ",error);
        return Response.json({
            success : false,
            message : "Error in deletion"
        },{
            status : 500
        })
    }

}