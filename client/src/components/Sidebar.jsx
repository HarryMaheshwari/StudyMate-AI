import { LayoutDashboard, Upload, FileText, GraduationCap, Brain, User, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Upload", icon: Upload, path: "/upload" },
  { name: "Notes", icon: FileText, path: "/notes" },
  { name: "Quiz", icon: GraduationCap, path: "/quiz" },
];

export default function Sidebar() {
  const { data: user } = useAuth();
  const logoutMutation = useLogout();

  return (
    <aside className="hidden w-72 flex-col border-r border-zinc-900 bg-black lg:flex">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500">
            <Brain className="text-black" size={20} />
          </div>
          <h2 className="text-lg font-bold tracking-tight">AsuxGlobal</h2>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-900 p-6">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-zinc-900 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.fullName}</p>
              <p className="text-xs text-zinc-500">Pro Account</p>
            </div>
          </div>
          
          {/* Added Logout Button */}
          <button 
            onClick={() => logoutMutation.mutate()}
            className="p-2 text-zinc-500 hover:text-red-400 transition"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}