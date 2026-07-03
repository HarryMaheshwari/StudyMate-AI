import DashboardLayout from "../layouts/DashboardLayout";
import Stats from "../components/Stats";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200">
          + Add Widget
        </button>
      </header>
      <Stats />
    </DashboardLayout>
  );
}