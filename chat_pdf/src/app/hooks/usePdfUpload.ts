import { useState } from 'react'
import { v5 as uuidv5 } from 'uuid'

const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'

interface PDF {
  id: string
  url: string
  name: string
  chatId: string
}

const usePdfUpload = (onChatRedirect: (chatId: string) => void) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploaded'>('idle')
  const [pdfs, setPdfs] = useState<PDF[]>([])

  const readFileAsync = async (file: File): Promise<PDF> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const chatId = uuidv5(file.name, NAMESPACE)
        resolve({
          id: Date.now().toString(),
          url: reader.result as string,
          name: file.name,
          chatId
        })
      }

      reader.onerror = reject

      reader.readAsDataURL(file)
    })
  }

  const handlePdfUpload = async (file: File) => {
    setUploadStatus('idle')
    const newPdf = await readFileAsync(file).catch(console.error)
    if (newPdf) {
      setPdfs((currentPdfs) => [newPdf, ...currentPdfs])
      setUploadStatus('uploaded')
      setTimeout(() => { setUploadStatus('idle') }, 3000)
    }
  }

  const handleRemovePdf = (pdfId: string) => {
    const filteredPdfs = pdfs.filter((pdf) => pdf.id !== pdfId)
    setPdfs(filteredPdfs)
  }

  return {
    uploadStatus,
    pdfs,
    handlePdfUpload,
    handleRemovePdf,
    handleChatRedirect: onChatRedirect
  }
}

export default usePdfUpload
