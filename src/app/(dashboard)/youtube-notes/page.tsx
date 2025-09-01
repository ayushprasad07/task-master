"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'sonner';
import { AnimatedModal } from '@/components/AnimatedMoodal';
import { cn } from '@/lib/utils';
import { YouTube } from '@/model/User';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2   mt-4'>
            {youtubeNotes.map((note)=>{
              return(
                <a
                  href={note.url}
                  target="_blank"
                  className="w-full  "
                  key={note._id}
                >
                  <CardContainer className="inter-var w-full">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full  h-auto rounded-xl p-6 border  ">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-900 dark:text-white"
                      >
                        {note.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {note.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <img
                          src={note.preview}
                          height="1000"
                          width="1000"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
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
