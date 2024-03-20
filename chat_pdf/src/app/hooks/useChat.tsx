import { useState } from "react";
import { v5 as uuidv5 } from "uuid";

const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

interface PDF {
  id: string;
  name: string;
  chatId: string; // Changed to string to match UUID format
}

const useChat = () => {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success">("idle");
  const [pdfs, setPdfs] = useState<PDF[]>([]);

  const handlePdfUpload = async (file: File) => {
    console.log("Uploading file:", file.name); // Log the file name being uploaded

    const chatId = uuidv5(file.name, NAMESPACE); // Generate chatId using UUID
    console.log("Generated chatId:", chatId); // Log the generated chatId

    const pdfId = chatId;
    const pdfName = file.name;

    setTimeout(() => {
      console.log("Setting PDF state for:", pdfName); // Log before setting state
      setPdfs((prevPdfs) => [
        ...prevPdfs,
        { id: pdfId, name: pdfName, chatId },
      ]);
      setUploadStatus("success");
      console.log("Upload status set to success"); // Log after setting state
    }, 3000); // Added a timeout of 3000ms
  };

  const handleRemovePdf = (pdfId: string) => {
    setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== pdfId));
  };

  return {
    uploadStatus,
    pdfs,
    handlePdfUpload,
    handleRemovePdf,
  };
};

export default useChat;
