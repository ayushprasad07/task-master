"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, Youtube, FileText, FileUp, Sparkles } from "lucide-react";
import { Note, PDF, YouTube } from "@/model/User";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const [youtubeNotes, setYoutubeNotes] = useState<YouTube[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pdfNotes, setPdfNotes] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);

  const getYoutubeNotes = async () => {
    try {
      const result = await axios.get("/api/get-youtube-note");
      setYoutubeNotes(result.data.data.slice(0, 3));
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching youtube notes");
    }
  };

  const getNotes = async () => {
    try {
      const result = await axios.get("/api/get-note");
      setNotes(result.data.notes.slice(0, 3));
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching notes");
    }
  };

  const getPdfNotes = async () => {
    try {
      const result = await axios.get("/api/get-pdf-notes");
      setPdfNotes(result.data.data.slice(0, 3));
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching PDF notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getYoutubeNotes();
    getNotes();
    getPdfNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      {/* Animated Hero Section */}
      <div className="relative overflow-hidden w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Welcome to your workspace
              </span>
            </div>

            {/* Animated Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-text-shimmer bg-[length:200%_100%]">
                Dashboard
              </span>
            </h1>

            {/* Animated Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Manage and organize all your notes in one place with ease
            </p>

            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {youtubeNotes.length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">YouTube Notes</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {notes.length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Notes</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <FileUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {pdfNotes.length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">PDF Notes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 py-8 md:px-8 lg:px-8 pb-16 space-y-16 bg-white dark:bg-gray-900">
        {/* YouTube Notes Section */}
        <section className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Youtube className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                YouTube Notes
              </h2>
            </div>
            <Link
              href="/youtube-notes"
              className="group flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                View all
              </span>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {youtubeNotes.length > 0 ? (
              youtubeNotes.map((note) => (
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  key={note._id}
                >
                  <CardContainer className="w-full">
                    <CardBody className="bg-gray-50 dark:bg-gray-800 relative group/card hover:shadow-2xl hover:shadow-red-500/20 dark:hover:shadow-red-500/10 border border-gray-200 dark:border-gray-700 w-full h-full rounded-2xl p-6 transition-all duration-300">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2"
                      >
                        {note.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2"
                      >
                        {note.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={note.preview}
                            height="1000"
                            width="1000"
                            className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={note.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </a>
              ))
            ) : (
              <EmptyState message="No YouTube notes yet" />
            )}
          </div>
        </section>

        {/* Regular Notes Section */}
        <section className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Your Notes
              </h2>
            </div>
            <Link
              href="/notes"
              className="group flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                View all
              </span>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <Card
                  key={note._id}
                  className={cn(
                    "group hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 cursor-pointer overflow-hidden",
                    "bg-gradient-to-br",
                    index % 3 === 0 &&
                      "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-200 dark:border-blue-800 hover:border-blue-400",
                    index % 3 === 1 &&
                      "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200 dark:border-purple-800 hover:border-purple-400",
                    index % 3 === 2 &&
                      "from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800 hover:border-green-400"
                  )}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {note.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {note.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <EmptyState message="No notes yet" />
            )}
          </div>
        </section>

        {/* PDF Notes Section */}
        <section className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FileUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                PDF Notes
              </h2>
            </div>
            <Link
              href="/pdf-notes"
              className="group flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                View all
              </span>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pdfNotes.length > 0 ? (
              pdfNotes.map((note: any) => (
                <a
                  key={note._id}
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gray-50 dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {note.title}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {note.description}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <EmptyState message="No PDF notes yet" />
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-text-shimmer {
          animation: text-shimmer 3s linear infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
      <FileText className="w-10 h-10 text-gray-400" />
    </div>
    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
      {message}
    </p>
  </div>
);

export default Dashboard;
