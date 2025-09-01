"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import AnimatedPdfModal from "@/components/AnimatedPdfModal";

const PdfNotes = () => {
    const [pdfNotes,setPdfNotes] = useState([]);

    useEffect(()=>{
        const fetchPdfNotes = async()=>{
            const response = await axios.get('/api/get-pdf-notes');
            if(response.data){
                console.log(response.data.data);
                setPdfNotes(response.data.data)
            }
        }
        fetchPdfNotes();
    },[])

    
  return (
    <div className="p-2 md:p-4 w-full">
        <div className="w-full">
            <h1 className="text-2xl font-bold md:text-4xl text-center">PDF Notes</h1>
            <div className="w-full flex justify-between items-center mt-4">
                <div>
                    <p className="font-semibold">Your PDF Notes</p>
                </div>
                <div>
                    <AnimatedPdfModal/>
                </div>
            </div>
            <hr className="mt-4"/>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pdfNotes.map((note: any) => (
                    <a key={note._id} href={note.url} className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>  
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{note.description}</p>
                    </a>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PdfNotes
