"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { type Chat, type ChatContextType } from "@/app/interfaces/chat";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<Record<number, Chat>>({});

  const updateChat = useCallback((chatId: number, chat: Chat) => {
    setChats((prevChats) => ({
      ...prevChats,
      [chatId]: chat,
    }));
  }, []);

  const getChat = useCallback(
    (chatId: number): Chat | undefined => {
      return chats[chatId];
    },
    [chats],
  );

  const addPdf = useCallback(
    (pdfId: string, pdfName: string) => {
      // Assuming the PDF URL is generated based on the PDF ID and name, this logic might need to be adjusted.
      const pdfUrl = `https://example.com/pdf/${pdfId}`;
      Object.values(chats).forEach((chat) => {
        if (chat.pdfId === pdfId) {
          updateChat(chat.id, { ...chat, pdfUrl, pdfName });
        }
      });
    },
    [chats, updateChat],
  );

  const getPdf = useCallback(
    (chatId: number) => {
      const chat = chats[chatId];
      return chat ? chat.pdfUrl : "";
    },
    [chats],
  );

  const deletePdfAndChat = useCallback(
    (chatId: number) => {
      const updatedChats = { ...chats };
      delete updatedChats[chatId];
      setChats(updatedChats);
    },
    [chats],
  );

  return (
    <ChatContext.Provider
      value={{ chats, updateChat, getChat, addPdf, getPdf, deletePdfAndChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
