import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud } from "lucide-react";

import useUploadDocument from "../../hooks/useUploadDocument";

export default function UploadDropzone() {
  const [file, setFile] = useState(null);

  const uploadMutation = useUploadDocument();

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) return;

    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    });

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("document", file);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition
        ${
          isDragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-zinc-700 bg-zinc-900 hover:border-blue-500"
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={60}
          className="mx-auto mb-5 text-blue-500"
        />

        <h2 className="text-2xl font-semibold">
          Drag & Drop your PDF
        </h2>

        <p className="mt-3 text-zinc-400">
          or click here to browse
        </p>

      </div>

      {file && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="flex items-center gap-4">

            <FileText
              size={40}
              className="text-red-500"
            />

            <div className="flex-1">

              <h3 className="font-semibold">
                {file.name}
              </h3>

              <p className="text-sm text-zinc-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

          <button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
          >
            {uploadMutation.isPending
              ? "Uploading..."
              : "Upload PDF"}
          </button>

        </div>
      )}

    </div>
  );
}