import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Brain,
  User,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout"


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    title: "Library",
    icon: FileText,
    path: "/documents",
  },
  {
    title: "Quiz",
    icon: Brain,
    path: "/quiz",
  },
];

export default function Sidebar() {
  const { data: user } = useAuth();
  const logoutMutation = useLogout();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">

      {/* Logo */}
      <div className="border-b border-zinc-800 p-6">

        <h1 className="text-2xl font-bold tracking-tight">
          StudyMate
          <span className="text-blue-500">AI</span>
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          AI Learning Platform
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* User */}
      <div className="border-t border-zinc-800 p-4">

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-medium">
              {user?.fullName}
            </h3>

            <p className="truncate text-sm text-zinc-500">
              {user?.email}
            </p>
          </div>

        </div>

        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
        >
          <LogOut size={18} />

          {logoutMutation.isPending
            ? "Logging out..."
            : "Logout"}
        </button>

      </div>

    </aside>
  );
}