import DashboardLayout from "../layouts/DashboardLayout";
import DocumentGrid from "../components/documents/DocumentGrid";

export default function Documents() {
  return (
    <DashboardLayout>
      {/* 1. Outer container: h-[calc(100vh-2rem)] keeps it within viewport
        2. flex flex-col: sets up a vertical stack
        3. overflow-hidden: prevents the whole page from scrolling
      */}
      <div className="w-full h-[95vh] bg-zinc-950 rounded-3xl p-8 lg:p-16 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header: Fixed height, no grow/shrink */}
        <div className="flex-none mb-12">
          <h1 className="text-5xl font-serif font-bold text-white tracking-tight">
            My Library
          </h1>
          <p className="mt-4 text-zinc-400 text-lg">
            Manage all your uploaded study materials.
          </p>
        </div>

        {/* Grid Wrapper:
           1. flex-grow: takes all available remaining space
           2. overflow-y-auto: makes ONLY this section scroll
           3. pr-4: adds padding for the scrollbar
        */}
        <div className="flex-grow overflow-y-auto pr-4 scrollbar-hide">
          <DocumentGrid />
        </div>
        
      </div>
    </DashboardLayout>
  );
}