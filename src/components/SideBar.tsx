"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconLayoutDashboard,
  IconBrandYoutube,
  IconNotes,
  IconFileText,
  IconFileDescription,
  IconLogout,   
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Youtube Notes", href: "/youtube-notes", icon: <IconBrandYoutube className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Notes", href: "/notes", icon: <IconNotes className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Pdf Notes", href: "/pdf-notes", icon: <IconFileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Pdf Summary", href: "/pdf-summary", icon: <IconFileDescription className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
  ];
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/sign-in";  
  };

  return (
    <div className={cn("mx-auto flex w-full flex-1 flex-col overflow-hidden border bg-gray-100 md:flex-row dark:bg-neutral-800", "h-[100vh]")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto gap-y-5">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <div className="mt-auto flex justify-end">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 transition cursor-pointer"
            >
              <IconLogout className="h-5 w-5 shrink-0" />
              {open && <span>Logout</span>}
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1 overflow-y-scroll">{children}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <FileText className="h-8 w-8 text-blue-600" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Task-Master
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      {/* <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> */}
      <FileText className="h-8 w-8 text-blue-600" />
    </a>
  );
};
