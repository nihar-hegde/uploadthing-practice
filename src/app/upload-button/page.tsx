"use client";

import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import { useState } from "react";
import { UploadFileResponse } from "uploadthing/client";

export default function UploadButtonPage() {
  const [images, setImages] = useState<
    UploadFileResponse<{
      uploadedBy: string;
    }>[]
  >([]);

  const title = images.length ? (
    <>
      <p>Upload Complete!!!</p>
      <p className="mt-2">{images.length} files uploaded</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      <ul>
        {images.map((image) => (
          <li key={image.url} className="mt-2">
            <Link href={image.url}>{image.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setImages(res);
            const json = JSON.stringify(res);
            // Do something with the response
            console.log(res);
          }

          //alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
    </main>
  );
}
