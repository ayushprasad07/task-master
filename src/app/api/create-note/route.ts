import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { Note } from "@/model/User";


export async function POST(request : Request){
    await dbConnect();

    try {
        const {username, title, description} = await request.json();

        const user = await UserModel.findOne({username});

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