import DashboardLayout from "../layouts/DashboardLayout";
import UploadDropzone from "../components/upload/UploadDropzone";

export default function Upload() {
  return (
    <DashboardLayout>

      <div className="mx-auto max-w-4xl">

        <h1 className="mb-2 text-4xl font-bold">
          Upload PDF
        </h1>

        <p className="mb-8 text-zinc-400">
          Upload your study material and let AI generate notes,
          flashcards and quizzes.
        </p>

        <UploadDropzone />

      </div>

    </DashboardLayout>
  );
}