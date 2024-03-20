import React, { useState } from "react";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import { FiUpload, FiCheckCircle } from "react-icons/fi";

// import { Button } from "@/components/button";
import usePdfUpload from "@/hooks/usePdfUpload";

export default function DocumentSidebar({
  onClickRedirect,
  chatId,
}: {
  onClickRedirect: (chatId: string) => void;
  chatId: string;
}) {
  console.log(`SidebarComponent: chatId=${chatId}`); // This line is added to the original code
  const methods = useFormContext();
  const { control } = methods;
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);

  const { uploadStatus, pdfs, handlePdfUpload, handleRemovePdf } =
    usePdfUpload(onClickRedirect);

  return (
    <div className="w-full h-full overflow-auto p-6 text-gray-200 bg-gray-800 shadow-lg">
      <div className="mb-8">
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
        <ul className="space-y-2">
          {pdfs.map((pdf) => (
            <li
              key={pdf.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                selectedPdfId === pdf.id ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() => {
                setSelectedPdfId(pdf.id); // Set the selectedPdfId to the current pdf.id
                onClickRedirect(pdf.chatId);
              }}
            >
              <div className="flex items-center">
                <Image src="/pdf-icon.png" alt="PDF" width={24} height={24} />
                <span className="ml-4 truncate">{pdf.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the li's onClick
                  handleRemovePdf(pdf.id);
                }}
                className="ml-4 p-1 text-red-500 hover:text-red-300 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
