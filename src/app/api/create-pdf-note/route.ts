import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { PDF } from "@/model/User";
import {v2 as cloudinary} from "cloudinary";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

interface CloudinaryUploadResponse {
  secure_url: string;
}


export async function POST(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session?.user || !session){
        return Response.json({
            success : false,
            message : "User is not authenticated"
        },{
            status : 401
        })
    }

    const userId = user._id;


    try {
        const formData = await request.formData();
        const file = formData.get("pdf") as File | null;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        const user = await UserModel.findById(userId);

        if(!user){
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            });
        }

        if(!user.isVerified){
            return Response.json({
                success : false,
                message : "User is not verified. Verify your email."
            },{
                status : 401
            });
        }

        

        if(!file){
            return Response.json({
                success : false,
                message : "File not found"
            },{
                status : 404
            });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadResult = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "TaskMaster Pdf notes", resource_type: "raw" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResponse);
              }
            );
            uploadStream.end(buffer);
          });
        const url =uploadResult.secure_url || ""


        const pdf : PDF = {
            title,
            description,
            url,
            createdAt : new Date()
        }

        user.pdf.push(pdf);
        await user.save();

        return Response.json({
            success : true,
            message : "PDF note created successfully"
        },{
            status : 200
        });
        
    } catch (error) {
        console.log("Error while creating pdf note",error);
        return Response.json({
            success : false,
            message : "Error while creating pdf note"
        },{
            status : 500
        });
    }
}