"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const Verify = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [credentials, setCredentials] = useState({code:""});
    const router = useRouter();
    const params = useParams<{username: string}>();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        const {code} = credentials;
        const response = await axios.post("/api/verify-code",{
            username : params.username,
            verifyCode : code
        });
        toast.success(response.data.message);
        router.replace("/dashboard");
    } catch (error) {
        console.log("Error while submitting form",error);
        toast.error("Error while submitting form");
    }finally{
        setIsSubmitting(false)
    }
  };


  return (
    <div className="flex h-screen items-center justify-center p-4">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-2xl font-semibold text-center font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to Task-Master
            </h2>
            <p className="mt-2 max-w-sm text-center text-sm text-neutral-600 dark:text-neutral-300">
                Verify your account
            </p>
        
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Verification Code</Label>
                <Input id="code" name="code" placeholder="code" type="text" onChange={handleChange} />
                </LabelInputContainer>
        
                <button
                className="group/btn relative flex items-center justify-center relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
                >
                {isSubmitting ? (
                    <>
                        <Loader className="animate-spin" /> Please wait
                    </>
                ) : (<p>Verify</p>)}
                <BottomGradient />
                </button>
            </form>
        </div>
    </div>
  )
}


const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
 

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};


export default Verify;

