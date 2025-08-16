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

  const openInNewTab = () => {
    const blobUrl = URL.createObjectURL(file);
    window.open(blobUrl, "_blank", "noopener,noreferrer");
    // optional: revoke nanti biar gak bocor memory
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  };

  return (
    <div
      className="relative w-32 aspect-video border rounded-md overflow-hidden cursor-pointer"
      onClick={openInNewTab}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openInNewTab()}
    >
      <button
        className="absolute top-2 right-2 z-10 bg-white rounded-full shadow hover:bg-red-100 transition p-1"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        type="button"
        aria-label="Hapus file"
      >
        <XCircleIcon className="h-6 w-6 text-red-500" />
      </button>

      {isImage ? (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          fill
          className="object-cover"
          onLoad={(e) => {
            // revoke objectURL yang dipakai preview gambar
            const target = e.currentTarget as HTMLImageElement;
            URL.revokeObjectURL(target.src);
          }}
        />
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
  onFilesChange?: (files: File[] | (string | File)[]) => void; // biar fleksibel
  initialUrls?: string[];
  onRemoveInitial?: (index: number) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const updateFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    // kalau parent ingin gabungan initialUrls + files, kirimkan gabungan:
    onFilesChange?.([...(initialUrls as string[]), ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    updateFiles(next);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mt-2 w-full flex flex-wrap gap-4">
        {initialUrls.map((url, idx) => {
          const isImageUrl = /\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(url);

          const openUrl = () => {
            window.open(url, "_blank", "noopener,noreferrer");
          };

          return (
            <div
              key={`initial-${idx}`}
              className="relative w-32 aspect-video border rounded-md overflow-hidden cursor-pointer"
              onClick={openUrl}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openUrl()}
              title={url}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveInitial?.(idx);
                }}
                className="absolute top-2 right-2 z-10 bg-white rounded-full shadow hover:bg-red-100 transition p-1"
                aria-label="Hapus file awal"
              >
                <XCircleIcon className="h-6 w-6 text-red-500" />
              </button>

              {isImageUrl ? (
                // gunakan img biasa agar bisa load dari domain mana pun
                <img
                  src={url}
                  alt={`Gambar ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col justify-center items-center w-full h-full text-center p-2">
                  <FileIcon className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-xs truncate">{`File ${idx + 1}`}</p>
                </div>
              )}
            </div>
          );
        })}

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
              title="Klik atau seret file ke sini"
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
