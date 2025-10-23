"use client"
import { Note } from '@/model/User';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader } from 'lucide-react';
import { AnimatedNoteModal } from '@/components/AnimatedNoteModal';
import { Button } from '@/components/ui/button';
import { AnimatedViewModal } from '@/components/AnimatedViewModal';


const Notes = () => {
    const [notes , setNotes] = useState<Note[]>([]);
    const [loading , setLoading] = useState(false);
    

    useEffect(()=>{
      const fetchNotes = async () => {
        setLoading(true);
        try {
            const result = await axios.get("/api/get-note");
            setNotes(result.data.notes);
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
            <AnimatedNoteModal/>
        </div>
      </div>
      <hr className='mt-4'></hr>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4'>
        {loading ? (
          <>
            <Loader className='w-6 h-6 animate-spin mx-auto' /> Fetching Notes
          </>
        ) : (
            notes.map((note)=>(
            <Card key={note._id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.description.slice(0,100)} ...........</p>
              </CardContent>
              <CardFooter>
                <CardAction>
                  {/* <Button className='cursor-pointer'>Read More</Button> */}
                  <AnimatedViewModal id={note._id}/>
                </CardAction>
              </CardFooter>
            </Card>
          ))
        )}
        
      </div>
    </div>
  )
}

export default Notes
