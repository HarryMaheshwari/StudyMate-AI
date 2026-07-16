import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload, X, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import useUploadDocument from "../../hooks/useUploadDocument";

export default function UploadDropzone() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const uploadMutation = useUploadDocument();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);
    if (rejectedFiles.length > 0) {
      setError("Please upload a PDF under 25MB");
      return;
    }
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 25 * 1024 * 1024,
    multiple: false,
  });

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("document", file);
    uploadMutation.mutate(formData);
  };

  // Success State
  if (uploadMutation.isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={36} className="text-[#C9A44C] mx-auto mb-3" />
        <h3 className="text-lg font-serif font-bold text-[#FDFBF7]">Upload Complete</h3>
        <p className="text-sm text-zinc-400 mt-1 mb-4">Your notes are ready</p>
        <Link to="/documents" className="inline-block px-6 py-2 bg-[#C9A44C] text-zinc-950 font-medium rounded-lg hover:bg-[#B5872E] transition text-sm">
          Go to Library
        </Link>
      </div>
    );
  }

  // Uploading State
  if (uploadMutation.isPending) {
    return (
      <div className="text-center py-8">
        <Loader2 size={32} className="text-[#C9A44C] animate-spin mx-auto mb-3" />
        <p className="text-[#FDFBF7] font-medium text-sm">Processing...</p>
        <p className="text-xs text-zinc-500 mt-1">Please wait</p>
      </div>
    );
  }

  // File Preview State
  if (file) {
    return (
      <div className="border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-[#C9A44C]" />
          <div className="flex-1 min-w-0">
            <p className="text-[#FDFBF7] font-medium text-sm truncate">{file.name}</p>
            <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={() => setFile(null)} className="p-1 hover:bg-zinc-800 rounded transition">
            <X size={16} className="text-zinc-500" />
          </button>
        </div>
        <button onClick={handleUpload} className="w-full mt-3 py-2 bg-[#C9A44C] text-zinc-950 font-medium rounded-lg hover:bg-[#B5872E] transition text-sm">
          Upload Document
        </button>
      </div>
    );
  }

  // Initial State
  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          isDragActive ? "border-[#C9A44C] bg-[#C9A44C]/5" : "border-zinc-800 hover:border-zinc-700"
        }`}
      >
        <input {...getInputProps()} />
        <Upload size={24} className={`mx-auto mb-2 ${isDragActive ? "text-[#C9A44C]" : "text-zinc-500"}`} />
        <p className="text-sm text-[#FDFBF7] font-medium">{isDragActive ? "Drop your PDF" : "Upload your notes"}</p>
        <p className="text-xs text-zinc-500 mt-1">PDF up to 25MB</p>
      </div>
      {error && <p className="text-amber-400 text-xs text-center mt-3">{error}</p>}
    </div>
  );
}