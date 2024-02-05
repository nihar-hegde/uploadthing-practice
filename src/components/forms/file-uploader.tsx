import { useCallback, Dispatch, SetStateAction } from "react";
//import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  files: File[];
};

export function FileUploader({
  imageUrls,
  onFieldChange,
  setFiles,
  files,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(acceptedFiles.map(convertFileToUrl));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
    multiple: true, // allow multiple file selection
  });
  console.log(imageUrls, "FROM FILE UPLOADER");

  const handleDelete = (index: number) => {
    // remove the photo from the imageUrls array
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    // update the form field value with the new array
    onFieldChange(newImageUrls);
    // remove the photo from the files state
    const newFiles = files.filter((_, i) => i !== index);
    // update the files state with the new array
    setFiles(newFiles);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-72 cursor-pointer overflow-hidden rounded-xl bg-grey-50">
        {/* create a separate div element for the drop zone and apply the getRootProps function to it */}
        <div
          {...getRootProps()}
          className="flex items-center justify-center flex-1"
        >
          <input {...getInputProps()} className="cursor-pointer" />
          <div className="flex items-center justify-center flex-col py-5 text-grey-500">
            <UploadCloud />
            <h3 className="mb-2 mt-2">Drag photos here</h3>

            <Button type="button" className="rounded-full">
              Select from computer
            </Button>
          </div>
        </div>
      </div>
      {imageUrls[0] !== "" ? (
        <div className="flex flex-wrap justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <img
                src={imageUrl}
                alt={`image ${index + 1}`}
                width={96}
                height={96}
                className="object-cover object-center rounded-lg"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                onClick={() => handleDelete(index)}
              >
                <X />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
