export interface Chat {
  id: number
  name: string
  messages: string[]
}

export interface Pdf {
  id: string // Unique identifier for each PDF
  url: string // URL to access the PDF file
  chatId?: number // Optional: Associate a PDF with a chat, if necessary
  // Add any other properties that might be relevant for your PDFs
}

export interface ChatWithPdf extends Chat {
  pdf?: Pdf
}

export interface UnifiedChatContextType {
  chats: Record<number, ChatWithPdf>
  updateChat: (chatId: number, chat: Chat, pdf?: Pdf) => void
  getChat: (chatId: number) => ChatWithPdf | undefined
}
