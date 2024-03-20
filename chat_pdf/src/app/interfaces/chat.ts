export interface Chat {
  id: number;
  name: string;
  messages: string[];
  pdfId: string; // Unique identifier for each PDF
  pdfUrl: string; // URL to access the PDF file
  pdfName: string; // Name of the PDF file
}

// Define the context type for chats
export interface ChatContextType {
  chats: Record<number, Chat>;
  updateChat: (chatId: number, chat: Chat) => void;
  getChat: (chatId: number) => Chat | undefined;
  addPdf: (pdfId: string, pdfName: string) => void;
  getPdf: (chatId: number) => string;
  deletePdfAndChat: (chatId: number) => void;
}
