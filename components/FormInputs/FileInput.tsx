import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFilePdf } from "react-icons/fa6";
type ImageInputProps = {
  title: string;
  fileUrl: string;
  setFileUrl: any;
  endpoint: any;
};
export default function FileInput({
  title,
  fileUrl,
  setFileUrl,
  endpoint,
}: ImageInputProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Link
            className="flex items-center space-x-2"
            href={fileUrl}
            download
            target="_blank"
          >
            <FaFilePdf className="w-12 h-12 text-red-600" />
            <span>{fileUrl}</span>
          </Link>
          <UploadButton
            className="col-span-full"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);

              setFileUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
