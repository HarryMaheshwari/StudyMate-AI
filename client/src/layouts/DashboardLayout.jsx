import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children, hideBottomNav = false }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 md:bg-zinc-200 font-sans text-white">
      <Sidebar hideBottomNav={hideBottomNav} />
      
      <main className="flex-1 w-full min-w-0  overflow-y-auto">
        <div className={`
          w-full
          px-0 sm:px-0 md:px-6 lg:px-4
          py-0 sm:py-0 md:py-6 lg:py-4
          ${hideBottomNav ? 'pb-0' : 'pb-24 md:pb-6'}
        `}>
          {children}
        </div>
      </main>
    </div>
  );
}