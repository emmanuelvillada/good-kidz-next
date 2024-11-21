"use client";
import dynamic from 'next/dynamic';
import { Worker } from "@react-pdf-viewer/core";

const Viewer = dynamic(
  () => import('@react-pdf-viewer/core').then((mod) => mod.Viewer),
  { ssr: false }
);

const PdfViewer = ({ url }: { url: string }) => {
  return (
    
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <Viewer 
          
          fileUrl={url}
          defaultScale={1}
          
        />
      </Worker>
    
  );
};

export default PdfViewer;