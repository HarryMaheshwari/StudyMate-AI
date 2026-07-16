import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Award, BookOpen, Sparkles, 
  Settings, LogOut, Edit2, Save, X,
  TrendingUp, Clock, CheckCircle, Loader2,
  ChevronRight, FileText, Upload
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import useDocuments from "../hooks/useDocuments";

export default function Profile() {
  const { data: user, isLoading: authLoading } = useAuth();
  const { data: documents } = useDocuments();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setShowLogoutModal(false);
  };

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      </DashboardLayout>
    );
  }

  const stats = {
    total: documents?.length || 0,
    ready: documents?.filter(d => d.status?.toLowerCase() === 'ready' || d.status?.toLowerCase() === 'completed').length || 0,
    processing: documents?.filter(d => d.status?.toLowerCase() === 'processing').length || 0,
  };

  const initial = user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <DashboardLayout>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 bg-zinc-950 rounded-4xl">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Profile
            </h1>
            <p className="text-zinc-400 text-sm">
              Manage your account settings and view your activity
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            {/* Cover/Avatar Section */}
            <div className="relative">
              <div className="h-24 sm:h-32 bg-gradient-to-r from-[#C9A44C]/20 to-[#C9A44C]/5" />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A44C] to-[#E8C86D] flex items-center justify-center text-3xl font-bold text-[#09090B] border-4 border-[#121212] shadow-xl">
                  {initial}
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded-xl bg-[#121212] border border-[#1f1f1f] text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  title={isEditing ? "Cancel" : "Edit Profile"}
                >
                  {isEditing ? <X size={16} /> : <Edit2 size={16} />}
                </button>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="p-2 rounded-xl bg-[#121212] border border-[#1f1f1f] text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-6 px-6">
              <div className="text-center sm:text-left">
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="flex-1 bg-[#1A1A1E] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C9A44C] transition-colors w-full sm:w-auto"
                    />
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A44C] text-[#09090B] rounded-xl font-medium hover:bg-[#D4B45C] transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-white">
                      {user?.email?.split('@')[0] || 'User'}
                    </h2>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <Mail size={14} className="text-zinc-500" />
                      <span className="text-sm text-zinc-400">{user?.email}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-[#1A1A1E] rounded-xl p-4 text-center border border-[#1f1f1f]">
                  <BookOpen size={18} className="text-[#C9A44C] mx-auto mb-1" />
                  <p className="text-xl font-bold text-white">{stats.total}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Documents</p>
                </div>
                <div className="bg-[#1A1A1E] rounded-xl p-4 text-center border border-[#1f1f1f]">
                  <CheckCircle size={18} className="text-emerald-400 mx-auto mb-1" />
                  <p className="text-xl font-bold text-emerald-400">{stats.ready}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Ready</p>
                </div>
                <div className="bg-[#1A1A1E] rounded-xl p-4 text-center border border-[#1f1f1f]">
                  <Clock size={18} className="text-amber-400 mx-auto mb-1" />
                  <p className="text-xl font-bold text-amber-400">{stats.processing}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => navigate('/documents')}
              className="flex items-center gap-3 p-4 bg-[#121212] border border-[#1f1f1f] rounded-xl hover:border-zinc-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9A44C]/10 flex items-center justify-center">
                <FileText size={18} className="text-[#C9A44C]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">My Library</p>
                <p className="text-xs text-zinc-500">View all your documents</p>
              </div>
              <ChevronRight size={16} className="text-zinc-600 group-hover:text-[#C9A44C] transition-colors" />
            </button>

            <button
              onClick={() => navigate('/upload')}
              className="flex items-center gap-3 p-4 bg-[#121212] border border-[#1f1f1f] rounded-xl hover:border-zinc-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9A44C]/10 flex items-center justify-center">
                <Upload size={18} className="text-[#C9A44C]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">Upload New</p>
                <p className="text-xs text-zinc-500">Add study materials</p>
              </div>
              <ChevronRight size={16} className="text-zinc-600 group-hover:text-[#C9A44C] transition-colors" />
            </button>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-[#121212] border border-[#1f1f1f] rounded-xl p-4">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Account Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-[#1f1f1f]">
                <span className="text-zinc-500">Email</span>
                <span className="text-white">{user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1f1f]">
                <span className="text-zinc-500">Member Since</span>
                <span className="text-white">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-500">Status</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                {/* Close button */}
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                    <LogOut size={28} className="text-red-400" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  Logout?
                </h3>
                
                {/* Description */}
                <p className="text-sm text-zinc-400 text-center mb-6">
                  Are you sure you want to logout from your account? You'll need to login again to access your study materials.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {logoutMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Logging out...
                      </>
                    ) : (
                      'Logout'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}