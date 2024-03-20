"use client";

import React, { useEffect, useState } from "react";
import ChatComponent from "@/app/chat/[chatId]/chatComponent";
import DocumentUploadSidebar from "@/app/chat/[chatId]/documentSidebar";
import PDFViewer from "@/app/chat/[chatId]/pdfViewer";
import { useUnifiedChatContext } from "@/context/chatProvider";
import { redirect } from "next/navigation";
import { type ChatWithPdf } from "@/app/interfaces/chat"; // Assuming this interface is correctly defined elsewhere

export default function ChatPage() {
  const { getChat } = useUnifiedChatContext();
  const [currentChat, setCurrentChat] = useState<ChatWithPdf | undefined>();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    if (chatId) {
      const chatDetails = getChat(parseInt(chatId));
      setCurrentChat(chatDetails);
      setIsLoading(false); // Assuming you set loading to false after fetching
    }
  }, [chatId, getChat]);

  // get all the chats from context

  console.log("ChatPage: chatId=", chatId);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading screen or component
  }

  const handleChatRedirect = (chatId: string) => {
    redirect(`/chat/${chatId}`);
  };

  const pdfs = currentChat?.pdf ? [currentChat.pdf] : [];

  return (
    <div className="flex max-h-screen h-screen">
      <div className="flex w-full max-h-screen h-screen">
        {/* Document upload sidebar */}
        <div className="flex-[1] max-w-xs p-0 m-0">
          <DocumentUploadSidebar
            chatId={chatId as string}
            onClickRedirect={handleChatRedirect}
          />
        </div>
        {/* PDF viewer */}
        <div className="flex-[5] max-h-screen p-4 h-screen m-0">
          {pdfs.length > 0 && <PDFViewer pdfDataUrl={pdfs[0].url} />}
        </div>
        {/* Chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200 p-0 m-0">
          <ChatComponent
            chatId={parseInt(chatId as string)}
            pdfUrl={currentChat?.pdf?.url || ""}
          />
        </div>
      </div>
    </div>
  );
}
