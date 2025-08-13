"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';

const Dashboard = () => {
  const [youtubeNotes, setYoutubeNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [pdfNotes, setPdfNotes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getNotes = async () => {
    try {
      const result = await axios.get("/api/get-note");
      console.log(result.data.data);
      setNotes(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching notes");
    }
  }

  const getPdfNotes = async () => {
    try {
      const result = await axios.get("/api/get-pdf-notes");
      console.log(result.data.data);
      setPdfNotes(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching youtube notes");
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getYoutubeNotes();
    getNotes();
    getPdfNotes();
  },[])


  return (
    <div className='p-4 mx-auto '>
      <div>
        <h1 className='text-4xl font-bold text-center'>Dashboard</h1>
      </div>
    </div>
  )
}

export default Dashboard
