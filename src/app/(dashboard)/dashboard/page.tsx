"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { ArrowBigDown, ArrowDown } from "lucide-react";
import { Note, YouTube } from "@/model/User";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      console.log("Notes", result.data.data);
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
            );
          })}
        </div>
      </div>
      {/* Notes */}
      <div className="w-full mt-10 mb-10">
        <div className="w-full flex justify-between mt-4 items-center">
          <h2 className="text-xl font-semibold">Your Notes</h2>
          <Link
            href="/notes"
            className="font-semibold text-blue-600 flex items-center justify-center"
          >
            view more <ArrowBigDown className="ml-2" />
          </Link>
        </div>
        <hr className="mt-4" />
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {notes.map((note) => (
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
