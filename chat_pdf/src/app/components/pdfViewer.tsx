import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

interface Props {
  pdfDataUrl: string // Changed from pdfBlob: Blob
}

const PDFViewer: React.FC<Props> = ({ pdfDataUrl }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

  // Directly use the provided Data URL for the file prop
  return (
    <Document file={pdfDataUrl}>
      <Page pageNumber={1} />
    </Document>
  )
}

export default PDFViewer
