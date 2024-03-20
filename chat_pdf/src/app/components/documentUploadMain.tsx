"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FiUpload,
  FiCheckCircle,
  FiTrash2,
  FiMessageCircle,
} from "react-icons/fi";
import Image from "next/image";
import { Button } from "@/components/button";
import { redirect } from "next/navigation";
import { useChatContext } from "@/app/context/chatProvider"; // Import useChatContext
import useChat from "@/app/hooks/useChat"; // Import useChat

export default function DocumentUpload() {
  const { control } = useFormContext();
  const { uploadStatus, handlePdfUpload, handleRemovePdf } = useChat(); // Use useChat hook
  const { chats, deletePdfAndChat } = useChatContext(); // Use useChatContext to fetch chats

  const onClickRedirect = (chatId: string) => {
    redirect(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Controller
        name="pdfs"
        control={control}
        render={({ field: value }) => (
          <label
            htmlFor="pdf-upload"
            className="flex items-center justify-center gap-4 border-2 border-dashed bg-zinc-800 border-indigo-300 rounded-lg cursor-pointer hover:border-indigo-500 w-full px-4 py-6"
          >
            {uploadStatus === "idle" ? (
              <div className="flex items-center text-zinc-300">
                <FiUpload />
                <span className="pl-3">Click to upload PDF</span>
              </div>
            ) : (
              <div className="flex items-center text-green-500">
                <FiCheckCircle />
                <span className="pl-3">Upload Successful!</span>
              </div>
            )}
            <input
              accept="application/pdf"
              className="hidden"
              id="pdf-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                console.log("File selected:", file);
                if (file) handlePdfUpload(file);
              }}
            />
          </label>
        )}
      />
      {Object.values(chats).map((chat) => (
        <div
          key={chat.id}
          className="flex items-center gap-12 justify-between w-full p-4 border rounded-lg mt-4"
        >
          <div className="flex items-center">
            <Image src="/pdf-icon.png" alt="PDF" width={24} height={24} />
            <span className="flex-1 ml-4 text-zinc-300">{chat.pdfName}</span>
            <button
              onClick={() => deletePdfAndChat(chat.id)}
              className="p-2 text-red-500 hover:text-red-300 rounded"
            >
              <FiTrash2 />
            </button>
          </div>
          <div className="flex">
            <Button
              variant="filled"
              className="flex items-center gap-2 p-2 rounded"
              onClick={() => onClickRedirect(chat.id.toString())} // Adjusted to pass chatId as string
            >
              <FiMessageCircle />
              <span>Chat with PDF</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
