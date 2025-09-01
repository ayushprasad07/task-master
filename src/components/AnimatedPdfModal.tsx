"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { toast } from "sonner";
import axios from "axios";
import { Loader } from "lucide-react";

export default function AnimatedNoteModal() {

  const [credentials, setCredentials] = useState({title:"", description: ""});
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "pdf"){
      setPdf(e.target.files![0]);
    }else{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {title, description} = credentials;
      const formData = new FormData();
      formData.append("pdf", pdf!);
      formData.append("title", title);
      formData.append("description", description);
      const response = await  axios.post("/api/create-pdf-note",formData);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while submitting form",error);
      toast.error("Error while submitting form");
    }finally{
      setLoading(false)
    }
  }

  const images = [
  // Productivity & Workspace
  "https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  
  // Study & Education
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  
  // Note-taking & Writing
  "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  
  // Cooking & Food
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1556909262-f9c6a3b9fbb6?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  
  // Creative & Design
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
  
  // Music & Entertainment (the missing 20th photo!)
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3"
];

  return (
    <div className="">
      <div className="py-2  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black cursor-pointer dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Add Note
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📝
          </div>
        </ModalTrigger>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                Create your note{" "}
                <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                  Youtube
                </span>{" "}
                now! 📝
              </h4>
              <div className="flex justify-center items-center">
                {images.map((image, idx) => (
                  <motion.div
                    key={"images" + idx}
                    style={{
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                  >
                    <img
                      src={image}
                      alt="bali images"
                      width="500"
                      height="500"
                      className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="py-4 flex flex-wrap gap-x-4  items-start justify-start max-w-sm mx-auto">
                <LabelInputContainer className="mb-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="" type="text" onChange={handleChange} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="" type="text" onChange={handleChange} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                <Label htmlFor="pdf">Pdf Upload</Label>
                <Input id="pdf" name="pdf" placeholder="" type="file" onChange={handleChange} />
                </LabelInputContainer>
              </div>
            </ModalContent>
            <ModalFooter className="gap-2">
              <button className="px-2 py-1 bg-gray-200 cursor-pointer text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                Cancel
              </button>
              <button type="submit" className="group/btn relative flex items-center justify-center block h-10 w-28 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer">
                {loading ? (<>
                  <><Loader className="animate-spin mr-2 h-4 w-4" /> Please wait</>
                </>) : (<p>Create</p>)}
              </button>
            </ModalFooter>
          </ModalBody>
        </form>
      </Modal>
    </div>
    </div>
  );
}

 
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
