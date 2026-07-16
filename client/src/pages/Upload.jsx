import DashboardLayout from "../layouts/DashboardLayout";
import UploadDropzone from "../components/upload/UploadDropzone";
import { ArrowLeft, FileCheck, Shield, HardDrive, Zap, Clock, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export default function Upload() {
  return (
    <DashboardLayout>
      <div className="w-full min-h-[calc(100vh-2rem)] bg-zinc-950 md:rounded-4xl p-4 sm:p-6 lg:p-12 border border-zinc-900 shadow-2xl flex flex-col">
        
        {/* Back Button */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-[#C9A44C] transition-all mb-6 sm:mb-8 lg:mb-12 group"
        >
          <ArrowLeft size={30} className="group-hover:-translate-x-0.5 transition-transform" />
          
        </Link>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:w-5/12 space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#FDFBF7] tracking-tight leading-[1.1]">
                Add Study <br className="hidden sm:block" /> Material
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Upload your lecture notes, textbooks, or PDFs. Our AI will analyze your documents to generate structured insights.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0 pt-2">
                <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-3 text-center">
                  <Zap size={16} className="text-[#C9A44C] mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-500">Instant</p>
                  <p className="text-[10px] font-medium text-white">Analysis</p>
                </div>
                <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-3 text-center">
                  <Clock size={16} className="text-[#C9A44C] mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-500">Fast</p>
                  <p className="text-[10px] font-medium text-white">Processing</p>
                </div>
                <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-3 text-center">
                  <Layers size={16} className="text-[#C9A44C] mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-500">Smart</p>
                  <p className="text-[10px] font-medium text-white">Insights</p>
                </div>
              </div>
            </div>
            
            {/* Upload Dropzone */}
            <div className="lg:w-7/12 w-full">
              <UploadDropzone />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-6 sm:pt-8 lg:pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start gap-3">
            <FileCheck size={18} className="text-[#C9A44C] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#FDFBF7]">Supported Formats</h4>
              <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">PDF files supported. More formats coming soon.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-[#C9A44C] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#FDFBF7]">Privacy Guaranteed</h4>
              <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">Your files are encrypted and processed securely.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <HardDrive size={18} className="text-[#C9A44C] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#FDFBF7]">Max File Size</h4>
              <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">Keep files under 25MB for fast processing.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}