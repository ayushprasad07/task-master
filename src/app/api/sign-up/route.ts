import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(req:Request){
    await dbConnect();

    try {
        const {email,username,password} = await req.json();
        const existingUserByUsername = await UserModel.findOne({username, isVerified : true});

        if(existingUserByUsername){
            return Response.json({success : false,message : "Username already exists"},{status : 400});
        }

        const existingUserByEmail = await UserModel.findOne({email});
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000);

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({success : false,message : "Email already exists"},{status : 400});
            }else{
                const hashedPassword = await bcrypt.hash(password,10);
                existingUserByEmail.username = username;
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verificationCode = verificationCode;
                existingUserByEmail.verificationExpiry = verificationExpiry;
                await existingUserByEmail.save();
            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10);
            const user = new UserModel({
                username,
                email,
                password : hashedPassword,
                verificationCode,
                verificationExpiry
            });
            await user.save();
        }


        const sendEmail = await sendVerificationEmail(username,email,verificationCode);

        if(!sendEmail.success){
            return Response.json({success : false,message : sendEmail.message},{status : 400});
        }

        return Response.json({success : true,message : "User registered and Verification email sent"},{status : 200});
    } catch (error) {
        console.log("Error while signing up",error);
        return Response.json({success : false,message : "Error while signing up"},{status : 500});
    }
}