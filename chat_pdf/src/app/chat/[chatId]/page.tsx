"use client";

import React, { useEffect, useState } from "react";
import ChatComponent from "@/components/chatComponent";
import DocumentUploadSidebar from "@/components/documentSidebar";
import PDFViewer from "@/components/pdfViewer";
import { useRouter } from "next/router";
import { useUnifiedChatContext } from "@/context/chatProvider";
import { type ChatWithPdf } from "@/interfaces/chatPdf"; // Assuming this interface is correctly defined elsewhere

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = router.query;
  const { getChat } = useUnifiedChatContext();

  const [currentChat, setCurrentChat] = useState<ChatWithPdf | undefined>();

  const handleChatRedirect = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  useEffect(() => {
    if (chatId) {
      const chat = getChat(parseInt(chatId as string));
      setCurrentChat(chat);
    }
  }, [chatId, getChat]);

  // Assuming pdfs is meant to be derived from currentChat.pdf
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
