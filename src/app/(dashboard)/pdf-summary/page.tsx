"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";


const PdfSummary = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");


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
                    <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-800 dark:text-gray-100">
                        Summary
                    </h1>

                    <p className="text-lg text-gray-700 dark:text-gray-300 h-auto overflow-y-auto text-center leading-relaxed whitespace-pre-wrap">
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
