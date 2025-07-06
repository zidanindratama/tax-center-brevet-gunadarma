"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon, FileIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

const FilePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const isImage = file.type.startsWith("image/");
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="relative w-32 aspect-video border rounded-md overflow-hidden">
      <button
        className="absolute top-2 right-2 z-10 bg-white rounded-full shadow hover:bg-red-100 transition p-1"
        onClick={onRemove}
        type="button"
      >
        <XCircleIcon className="h-6 w-6 text-red-500" />
      </button>

      {isImage ? (
        <Image src={fileUrl} alt={file.name} fill className="object-cover" />
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full text-center p-2">
          <FileIcon className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-xs truncate">{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default function FileInput({
  onFilesChange,
  initialUrls = [],
  onRemoveInitial,
}: {
  onFilesChange?: (files: File[]) => void;
  initialUrls?: string[];
  onRemoveInitial?: (index: number) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const updateFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    updateFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mt-2 w-full flex flex-wrap gap-4">
        {initialUrls.map((url, idx) => (
          <div
            key={`initial-${idx}`}
            className="relative w-32 aspect-video border rounded-md overflow-hidden"
          >
            <img
              src={url}
              alt={`Gambar ${idx + 1}`}
              className="object-cover w-full h-full"
            />
            {onRemoveInitial && (
              <button
                type="button"
                onClick={() => onRemoveInitial(idx)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full shadow hover:bg-red-100 transition p-1"
              >
                <XCircleIcon className="h-6 w-6 text-red-500" />
              </button>
            )}
          </div>
        ))}

        {files.map((file, idx) => (
          <FilePreview
            key={`file-${idx}`}
            file={file}
            onRemove={() => handleRemoveFile(idx)}
          />
        ))}

        <Dropzone
          onDrop={(acceptedFiles) => {
            updateFiles([...files, ...acceptedFiles]);
          }}
          multiple
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => (
            <div
              {...getRootProps()}
              className={cn(
                "border border-dashed flex items-center justify-center w-48 aspect-video rounded-md cursor-pointer",
                {
                  "border-primary bg-secondary": isDragActive && isDragAccept,
                  "border-destructive bg-destructive/20":
                    isDragActive && isDragReject,
                }
              )}
            >
              <input {...getInputProps()} />
              <ImageIcon className="h-10 w-10" strokeWidth={1.25} />
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
