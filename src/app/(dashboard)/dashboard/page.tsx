"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { ArrowBigDown, ArrowDown } from "lucide-react";
import { Note, YouTube } from "@/model/User";
import { cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Dashboard = () => {
  const [youtubeNotes, setYoutubeNotes] = useState<YouTube[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pdfNotes, setPdfNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getYoutubeNotes = async () => {
    try {
      const result = await axios.get("/api/get-youtube-note");
      console.log(result.data.data);
      setYoutubeNotes(result.data.data.slice(0, 3));
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching youtube notes");
    }
  };

  const getNotes = async () => {
    try {
      const result = await axios.get("/api/get-note");
      console.log("Notes",result.data.data);
      setNotes(result.data.notes.slice(0, 3));
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching notes");
    }
  };

  const getPdfNotes = async () => {
    try {
      const result = await axios.get("/api/get-pdf-notes");
      console.log(result.data.data);
      setPdfNotes(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching youtube notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getYoutubeNotes();
    getNotes();
    getPdfNotes();
  }, []);

  return (
    <div className="p-4 mx-auto w-full">
      <div>
        <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      </div>
      {/* Youtube Notes */}
      <div className="w-full">
        <div className="w-full flex justify-between mt-4">
          <h2 className="text-xl font-semibold">Your Youtube Notes</h2>
          <Link
            href="/youtube-notes"
            className="font-semibold text-blue-600 flex items-center justify-center"
          >
            {" "}
            <p>view more</p>
            <ArrowBigDown className="ml-2" />
          </Link>
        </div>
        <hr className="mt-4 font-semibold"></hr>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {youtubeNotes.map((note) => {
            return (
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
            );
          })}
        </div>
      </div>
      {/* Notes */}
      <div className="w-full mt-10">
        <div className="w-full flex justify-between mt-4 items-center">
          <h2 className="text-xl font-semibold">Your Notes</h2>
          <Link href='/notes' className="font-semibold text-blue-600 flex items-center justify-center">view more <ArrowBigDown className="ml-2"/></Link>
        </div>
        <hr className="mt-4"/>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {notes.map((note)=>(
            <Card key={note._id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
