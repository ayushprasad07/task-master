"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'sonner';
import { AnimatedModal } from '@/components/AnimatedMoodal';
import { cn } from '@/lib/utils';
import { YouTube } from '@/model/User';

const YoutubeNotes = () => {
    const [youtubeNotes , setYoutubeNotes] = useState<YouTube[]>([]);
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
        <div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {youtubeNotes.map((note)=>{
              return(
                <a
                  href={note.url}
                  target="_blank"
                  className="w-full group/card "
                  key={note._id}
                >
                  <div
                    className={cn(
                      "cursor-pointer overflow-hidden relative card rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 text-neutral-900 aspect-video"
                    )}
                    style={{
                      backgroundImage: `url(${note.preview})`,
                      backgroundSize: "cover",      
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat", 
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover/card:backdrop-blur-sm transition duration-300"></div>
                    <div className="text content ">
                      <h1 className="font-bold text-lg md:text-xl text-neutral-190 relative z-10">
                        {note.title}
                      </h1>
                      <p className="font-normal text-sm text-neutral-190 relative z-10 my-2">
                        {note.description}
                      </p>
                    </div>
                  </div>
                </a>

              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeNotes
