"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'sonner';
import { AnimatedModal } from '@/components/AnimatedMoodal';

const YoutubeNotes = () => {
    const [youtubeNotes , setYoutubeNotes] = useState([]);
    const [loading , setLoading] = useState(false);

    const getYoutubeNotes = async () => {
        try {
            const result = await axios.get("/api/get-youtube-note");
            console.log(result.data.data);
            setYoutubeNotes(result.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Error while fetching youtube notes");
        }
    }

    useEffect(() => {
        getYoutubeNotes();
    },[])
  return (
    <div className='p-2 md:p-4 w-full'>
      <div className='w-full'>
        <h1 className='text-2xl font-bold text-center'>Youtube Notes</h1>
        <div className='w-full flex justify-between items-center'>
          <div>
            Your Youtube Notes
          </div>
          <div>
            <AnimatedModal/>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  )
}

export default YoutubeNotes
