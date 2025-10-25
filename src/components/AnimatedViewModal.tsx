"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import axios from "axios";
import { toast } from "sonner";

type ModalProps = {
  id?: string;
};

export function AnimatedViewModal({ id }: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 👈 manual modal state tracking

  // Fetch note when modal opens
  useEffect(() => {
    const fetchNote = async () => {
      if (!id || !isOpen) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/get-specific-note/${id}`);
        console.log("Response",response.data);
        const noteData = Array.isArray(response.data)
          ? response.data[0]?.note
          : response.data?.note;

          console.log("NoteData",noteData);

        if (!noteData) {
          toast.error("Note not found");
          return;
        }

        setTitle(noteData.title);
        setDescription(noteData.description);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [isOpen, id]);

  return (
    <div className="py-2 flex items-center justify-center">
      <Modal>
        <ModalTrigger
          onClick={() => setIsOpen(true)} // 👈 set open when clicked
          className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn"
        >
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            View Note
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📝
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent className="overflow-y-auto">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <>
                <h1 className="text-xl font-bold mb-2">{title}</h1>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {description}
                </p>
              </>
            )}
          </ModalContent>

          <ModalFooter className="gap-4">
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Edit
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
