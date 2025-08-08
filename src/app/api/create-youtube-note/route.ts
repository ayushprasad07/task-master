import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { YouTube } from "@/model/User";

export async function POST(request : Request){
    await dbConnect();

    try {
        const {username, title, description, url} = await request.json();
        const user = await UserModel.findOne({username});

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
            preview : `https://img.youtube.com/vi/${url.split('=')[1]}/hqdefault.jpg`,
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
