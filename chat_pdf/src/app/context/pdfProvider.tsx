// "use client";
// import React, { createContext, useContext, useState } from "react";
// import { Pdf, PdfContextProps } from "@/interfaces/pdf";

// const PdfContext = createContext<PdfContextProps>({
//   pdfs: [],
//   addPdf: () => {},
//   removePdf: () => {},
//   getPdf: () => undefined,
// });

// export const usePdfContext = () => useContext(PdfContext);

// export const PdfProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [pdfs, setPdfs] = useState<Pdf[]>([]);

//   const addPdf = (pdf: Pdf) => {
//     setPdfs((prevPdfs) => [...prevPdfs, pdf]);
//   };

//   const removePdf = (pdfId: string) => {
//     setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== pdfId));
//   };

//   const getPdf = (pdfId: string): Pdf | undefined => {
//     return pdfs.find((pdf) => pdf.id === pdfId);
//   };

//   return (
//     <PdfContext.Provider value={{ pdfs, addPdf, removePdf, getPdf }}>
//       {children}
//     </PdfContext.Provider>
//   );
// };
