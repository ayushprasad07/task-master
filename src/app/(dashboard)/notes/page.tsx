"use client"
import { Note } from '@/model/User';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Notes = () => {
    const [notes , setNotes] = useState<Note[]>([]);
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
      const fetchNotes = async () => {
        setLoading(true);
        try {
            const result = await axios.get("/api/get-note");
            console.log(result.data.data);
            setNotes(result.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Error while fetching notes");
        }finally{
            setLoading(false);
        }
      }
      fetchNotes();
    },[])


  return (
    <div className='p-2 md:p-4 w-full h-full'>
      <h1 className='text-2xl font-bold md:text-4xl text-center'>Notes</h1>
      <div className='w-full flex justify-between items-center mt-4'>
        <div>
            <p className='font-semibold'>Your Notes</p>
        </div>
        <div>
            Button
        </div>
      </div>
      <hr className='mt-4'></hr>
    </div>
  )
}

export default Notes
