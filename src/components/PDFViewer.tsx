// components/PDFViewer.js
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configurar worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PdfUrl = string;

const PDFViewer = ({ pdfUrl  }: { pdfUrl: PdfUrl }) => {
    
    const [numPages, setNumPages] = useState<number | null>(null);
      const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (numPages !== null && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (numPages !== null && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        <Page 
          pageNumber={currentPage}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      
      <div className="flex gap-4 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Anterior
        </button>
        
        <p className="flex items-center">
          Página {currentPage} de {numPages}
        </p>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage >= (numPages ?? 0) || numPages === null} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;