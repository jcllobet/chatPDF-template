'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'
import {
  type Chat,
  type Pdf,
  type ChatWithPdf,
  type UnifiedChatContextType
} from '@/app/interfaces/chatPdf'

const UnifiedChatContext = createContext<UnifiedChatContextType | undefined>(
  undefined
)

export const useUnifiedChatContext = () => {
  const context = useContext(UnifiedChatContext)
  if (!context) {
    throw new Error(
      'useUnifiedChatContext must be used within a UnifiedChatProvider'
    )
  }
  return context
}

export const UnifiedChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [chats, setChats] = useState<Record<number, ChatWithPdf>>({})

  const updateChat = useCallback((chatId: number, chat: Chat, pdf?: Pdf) => {
    setChats((prevChats) => ({
      ...prevChats,
      [chatId]: { ...chat, pdf }
    }))
  }, [])

  const getChat = useCallback(
    (chatId: number): ChatWithPdf | undefined => {
      return chats[chatId]
    },
    [chats]
  )

  return (
    <UnifiedChatContext.Provider value={{ chats, updateChat, getChat }}>
      {children}
    </UnifiedChatContext.Provider>
  )
}
