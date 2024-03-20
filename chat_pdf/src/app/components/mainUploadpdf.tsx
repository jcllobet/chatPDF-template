import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FiUpload,
  FiCheckCircle,
  FiTrash2,
  FiMessageCircle
} from 'react-icons/fi'
import Image from 'next/image'
import { Button } from '@/components/button'
import usePdfUpload from '@/hooks/usePdfUpload'

export default function DocumentUpload ({
  onClickRedirect
}: {
  onClickRedirect: (chatId: string) => void
}) {
  const methods = useFormContext()
  const { control } = methods

  const { uploadStatus, pdfs, handlePdfUpload, handleRemovePdf } =
    usePdfUpload(onClickRedirect)

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
            {uploadStatus === 'idle'
              ? (
              <div className="flex items-center text-zinc-300">
                <FiUpload />
                <span className="pl-3">Click to upload PDF</span>
              </div>
                )
              : (
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
                const file = e.target.files && e.target.files[0]
                if (file) handlePdfUpload(file)
              }}
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
              onClick={() => { handleRemovePdf(pdf.id) }}
              className="p-2 text-red-500 hover:text-red-300 rounded"
            >
              <FiTrash2 />
            </button>
          </div>
          <div className="flex">
            <Button
              variant="filled"
              className="flex items-center gap-2 p-2 rounded"
              onClick={() => { onClickRedirect(pdf.chatId) }}
            >
              <FiMessageCircle />
              <span>Chat with PDF</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
