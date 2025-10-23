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
import { title } from "process";

type ModalProps = {
    id ?: String
}

export function AnimatedViewModal({id} : ModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        const fetchNote = async () => {
            if(!id) return
            try {
                const response = await axios.get(`/api/get-specific-note/${id}`);
                console.log(response.data.note);
                setTitle(response.data.note.title);
                setDescription(response.data.note.description);
            } catch (error) {
                console.log(error);
            }
        }

        fetchNote();
    },[id]);

  return (
    <div className="py-2  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            View Note
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📝
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h1>{title}</h1>
            <p>
                {description}
            </p>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Close
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Edit
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

