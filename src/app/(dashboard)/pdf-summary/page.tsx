"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import {Save} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const PdfSummary = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [credentials,setcredentials] = useState({title:""});

  const handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }

  const handleSaveNotesButton  = async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        const {title} = credentials;
        const response = await axios.post("/api/create-note",{
            title,
            description :summary
        });
        toast.success(response.data.message);
        console.log(credentials.title);
    } catch (error) {
        toast.error("Error while saving file");
    }
  }


  const handleFileUpload = async(files: File[]) => {
    setFiles(files);
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("file", files[0]);

        const response = await axios.post("/api/pdf-summary", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data.message);
        setSummary(response.data.message);
        toast.success("File uploaded successfully");
    } catch (error) {
        console.log(error);
        toast.error("Error while uploading file");
    }finally{
        setLoading(false);
    }
    console.log(files);
  };
 
  return (
    <div className="p-4 w-full oveflow-y-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Pdf Summary</h1>
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
        </div>
        <div className="w-full max-w-4xl mx-auto relative mb-4 overflow-hidden">
            {loading && <p><Loader className="animate-spin r-2 h-4 w-4 " /> Please wait</p>}
            {summary.length >0 &&
                <div className="mt-6 w-full max-w-4xl mx-auto h-auto overflow-y-auto border border-dashed rounded-lg bg-white dark:bg-black border-neutral-300 dark:border-neutral-700 shadow-lg p-6 mb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-800 dark:text-gray-100">
                            Summary
                        </h1>
                        
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Save to Note</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleSaveNotesButton}>
                                    
                                    
                                    <DialogHeader>
                                        <DialogTitle>Save to the note tab</DialogTitle>
                                        <DialogDescription>
                                        Write the title to be written in the note
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" type="text" name="title" placeholder="Enter Title" value={credentials.title}  onChange={handleTitleChange}/>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" className="cursor-pointer">Save note</Button>
                                    </DialogFooter>
                                    
                                </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 h-auto overflow-y-auto text-start leading-relaxed whitespace-pre-wrap">
                        {loading ? (
                        <p><Loader className="animate-spin " /> Please wait</p>
                        ) : (
                        summary
                        )}
                    </p>
                </div>
            }
        </div>

    </div>
  );
}

export default PdfSummary
