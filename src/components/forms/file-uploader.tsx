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
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrls.length > 0 ? (
        <div className="flex h-full w-full flex-1 justify-center flex-wrap">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="relative w-24 h-6 m-0.5">
              <img
                src={imageUrl}
                alt={`image ${index + 1}`}
                width={105}
                height={24}
                className="object-cover object-center"
              />
              <Button
                className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1 rounded-full"
                onClick={() => handleDelete(index)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <UploadCloud />
          <h3 className="mb-2 mt-2">Drag photos here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
