import nodemailer from "nodemailer";

const transporterConfig = {
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}

async function sendVerificationEmail(username: string, email: string, verificationCode: string) {
    try {
        const transporter = nodemailer.createTransport(transporterConfig);
        const info = await transporter.sendMail({
            from: "Task Master <"+ process.env.EMAIL_USER + ">",
            to: email,
            subject: "Verify your email",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                        <h2 style="color: #6A5ACD;">Task Master Verification</h2>
                        
                        <p style="font-size: 16px; color: #333;">Hi <strong>${username}</strong>,</p>
                        
                        <p style="font-size: 16px; color: #333;">
                        Thanks for signing up for <strong>Task Master</strong>. To complete your registration, please use the following one-time verification code:
                        </p>
                        
                        <div style="font-size: 28px; font-weight: bold; color: #6A5ACD; text-align: center; margin: 30px 0;">
                        ${verificationCode}
                        </div>
    
                        <p style="font-size: 14px; color: #555;">
                        This code will expire in 10 minutes. If you didn&apos;t request this, you can safely ignore this email.
                        </p>
    
                        <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 40px;">
                        &copy; ${new Date().getFullYear()} Task Master by Ayush Prasad
                        </p>
                    </div>
                </div>
            `
        });
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return {success : true , message : "Email sent successfully"}
    } catch (error) {
        console.log("Error sending email : ",error);
        return {success : false , message : "Error sending email"}
    }
}

export default sendVerificationEmail;