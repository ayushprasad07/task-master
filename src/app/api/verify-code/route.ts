import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(req : Request) {
    
    await dbConnect();

    try {
        const {username, verifyCode} = await req.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({
            username : decodedUsername
        });

        if(!user){
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            })
        }

        const isValidCode = user.verificationCode === verifyCode;
        const isCodeNotExpired = new Date(user.verificationExpiry) > new Date();


        if(isValidCode && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success : true,
                message : "Code verified successfully"
            },{
                status : 200
            })
        }else if(!isCodeNotExpired){
            return Response.json({
                success : false,
                message : "Code expired"
            },{
                status : 400
            })
        }else{
            return Response.json({
                success : false,
                message : "Invalid code"
            },{
                status : 400
            })
        }


    } catch (error) {
        console.log("Error while verifying code",error);
        return Response.json({
            success : false,
            message : "Error while verifying code"
        },{
            status : 500
        })
    }
}