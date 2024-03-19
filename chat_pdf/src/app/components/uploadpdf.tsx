import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FiUpload,
  FiCheckCircle,
  FiTrash2,
  FiMessageCircle,
} from "react-icons/fi";
import Image from "next/image";

interface PDF {
  id: string;
  url: string; // This is the content of the file in base64 format
  name: string; // Original file name
}

const readFileAsync = (file: File): Promise<PDF> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        id: Date.now().toString(),
        url: reader.result as string,
        name: file.name,
      });
    };

    reader.onerror = reject;

    reader.readAsDataURL(file); // Read the file as Data URL
  });
};

function ProductImagesTab() {
  const methods = useFormContext();
  const { control, watch, setValue } = methods;
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploaded">("idle");
  const pdfs = watch("pdfs") || [];

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const newPdf = await readFileAsync(file);
    setValue("pdfs", [newPdf, ...pdfs]);
    setUploadStatus("uploaded");
    console.log(`File "${file.name}" uploaded successfully.`); // Log file upload success
    setTimeout(() => setUploadStatus("idle"), 3000); // Reset status after 3 seconds
    console.log("Upload successful!"); // Additional log for successful upload
  };

  const handleRemovePdf = (pdfId: string) => {
    const filteredPdfs = pdfs.filter((pdf: { id: string }) => pdf.id !== pdfId);
    setValue("pdfs", filteredPdfs);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Controller
        name="pdfs"
        control={control}
        render={({ field: { value } }) => (
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
                <span className="pl-3">Upload Successful!</span>{" "}
                {/* Added more descriptive text */}
              </div>
            )}
            <input
              accept="application/pdf"
              className="hidden"
              id="pdf-upload"
              type="file"
              onChange={handlePdfUpload}
            />
          </label>
        )}
      />
      {pdfs.map((pdf: { id: string; url: string; name: string }) => (
        <div
          key={pdf.id}
          className="flex items-center gap-12 justify-between w-full p-4 border rounded-lg mt-4"
        >
          <div className="flex items-center">
            <Image src="/pdf-icon.png" alt="PDF" width={24} height={24} />
            <span className="flex-1 ml-4 text-zinc-300">{pdf.name}</span>
          </div>
          <div className="flex">
            <button
              onClick={() => handleRemovePdf(pdf.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded"
            >
              <FiTrash2 />
            </button>
            <button className="p-2 text-blue-500 hover:bg-blue-100 rounded">
              <FiMessageCircle />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductImagesTab;
