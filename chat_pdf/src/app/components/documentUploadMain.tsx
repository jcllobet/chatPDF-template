"use client";

import React, { useState } from "react";
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
import { useChatContext } from "@/app/context/chatProvider";
import { Chat } from "@/app/interfaces/chat";

export default function DocumentUpload() {
  const methods = useFormContext();
  const { control } = methods;
  const { chats, updateChat, addPdf, deletePdfAndChat } = useChatContext();
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success">("idle");
  const [pdfs, setPdfs] = useState<Array<{ id: string; name: string }>>([]);

  const onClickRedirect = (chatId: number) => {
    redirect(`/chat/${chatId}`);
  };

  const handlePdfUpload = async (file: File) => {
    // Simulating PDF upload
    const randomId = Math.random().toString(36).substring(7);
    const pdfId = randomId;
    const chatId = Number(randomId);
    const pdfName = file.name;

    setPdfs((prevPdfs) => [...prevPdfs, { id: pdfId, name: pdfName }]);
    setUploadStatus("success");

    const newChat: Chat = {
      id: chatId,
      name: pdfName,
      messages: [],
      pdfId,
      pdfUrl: "",
      pdfName,
    };
    updateChat(chatId, newChat);
    addPdf(pdfId, pdfName);
  };

  const handleRemovePdf = (pdfId: string) => {
    setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== pdfId));
    const chatToDelete = Object.values(chats).find(
      (chat) => chat.pdfId === pdfId,
    );
    if (chatToDelete) {
      deletePdfAndChat(chatToDelete.id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Controller
        name="pdfs"
        control={control}
        render={({ field }) => (
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
                if (file) handlePdfUpload(file);
              }}
              value={field.value}
            />
          </label>
        )}
      />
      {pdfs.map((pdf) => (
        <div
          key={pdf.id}
          className="flex items-center gap-12 justify-between w-full p-4 border rounded-lg mt-4"
        >
          <div className="flex items-center">
            <Image src="/pdf-icon.png" alt="PDF" width={24} height={24} />
            <span className="flex-1 ml-4 text-zinc-300">{pdf.name}</span>
            <button
              onClick={() => {
                handleRemovePdf(pdf.id);
              }}
              className="p-2 text-red-500 hover:text-red-300 rounded"
            >
              <FiTrash2 />
            </button>
          </div>
          <div className="flex">
            <Button
              variant="filled"
              className="flex items-center gap-2 p-2 rounded"
              onClick={() => {
                const chatId = Object.values(chats).find(
                  (chat) => chat.pdfId === pdf.id,
                )?.id;
                if (chatId) onClickRedirect(chatId);
              }}
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
