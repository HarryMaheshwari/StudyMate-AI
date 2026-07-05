import DashboardLayout from "../layouts/DashboardLayout";
import DocumentGrid from "../components/documents/DocumentGrid";

export default function Documents() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            My Library
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage all your uploaded study materials.
          </p>
        </div>

        <DocumentGrid />

      </div>
    </DashboardLayout>
  );
}