import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/dbConnect";
import { GoogleGenAI } from "@google/genai";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
}

export async function POST(request: Request) {
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

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

    if (!file) {
      return Response.json({ success: false, message: "File not found" }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "TaskMaster Pdf summary", resource_type: "raw" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResponse);
        }
      );
      uploadStream.end(buffer);
    });

    const pdfUrl = uploadResult.secure_url;

    const pdfResp = await fetch(pdfUrl)
        .then((response) => response.arrayBuffer());

    const contents = [
        { text: "Summarize this document" },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(pdfResp).toString("base64")
            }
        }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents
    });


    return Response.json({ 
      success: true, 
      message: response.text 
    }, { 
      status: 200 
    });


  } catch (error) {
    console.error("Error while summarizing:", error);
    return Response.json(
      { success: false, message: "Error while summarizing the PDF" },
      { status: 500 }
    );
  }
}
