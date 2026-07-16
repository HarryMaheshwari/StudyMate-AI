import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Send, Loader2, Sparkles, 
  MessageSquare, FileText, Bot, User,
  Copy, Check, AlertCircle
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import useChat from "../hooks/useChat";
import useSendMessage from "../hooks/useSendMessage";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useChat(id);
  const sendMessageMutation = useSendMessage(id);

  const [message, setMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const messages = data?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading) {
    return (
      <DashboardLayout hideBottomNav={true}>
        <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
          <Loader2 className="animate-spin text-zinc-500" size={40} />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout hideBottomNav={true}>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center px-4">
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-8 max-w-md">
            <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Failed to Load Chat</h3>
            <p className="text-zinc-400 text-sm mb-4">{error.message || "Please try again later."}</p>
            <button 
              onClick={() => navigate(`/documents/${id}`)}
              className="px-6 py-2.5 bg-[#C9A44C] text-[#09090B] rounded-xl font-medium hover:bg-[#D4B45C] transition-colors"
            >
              Back to Document
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout hideBottomNav={true}>
      <div className="w-full h-screen md:h-[calc(100vh-2.6rem)] bg-zinc-900 flex flex-col overflow-hidden md:rounded-4xl">
        
        {/* Top Navigation */}
        <div className="flex-shrink-0 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <button 
                  onClick={() => navigate(`/documents/${id}`)} 
                  className="p-1.5 sm:p-2 hover:bg-zinc-800 active:bg-zinc-700 rounded-lg transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft size={18} className="text-zinc-400" />
                </button>
                <div className="flex items-center gap-2 min-w-0">
                  <MessageSquare size={16} className="text-[#C9A44C] flex-shrink-0" />
                  <h1 className="text-sm sm:text-base font-semibold text-white truncate">
                    Chat with PDF
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <FileText size={14} />
                <span className="hidden sm:inline">Document</span>
                <span className="truncate max-w-[80px] sm:max-w-xs text-zinc-400">
                  {data?.documentTitle || "PDF"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 scroll-smooth custom-scrollbar min-h-0"
        >
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-[50vh] text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#C9A44C]/10 flex items-center justify-center mb-6">
                  <Sparkles size={40} className="text-[#C9A44C]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Start asking questions
                </h2>
                <p className="text-zinc-400 text-sm mb-8 max-w-md">
                  Ask anything about your document and get AI-powered answers instantly.
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
                  {[
                    { label: "📄 Summarize this document", value: "Summarize this document in a few paragraphs." },
                    { label: "📖 Explain the first chapter", value: "Explain the first chapter in detail." },
                    { label: "❓ Important exam questions", value: "What are the important exam questions from this document?" },
                    { label: "🔑 Key takeaways", value: "What are the key takeaways from this document?" },
                  ].map((example) => (
                    <button
                      key={example.label}
                      onClick={() => setMessage(example.value)}
                      className="px-4 py-2.5 bg-[#121212] border border-[#1f1f1f] rounded-xl text-xs sm:text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-all duration-200 whitespace-nowrap"
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  const isThinking = msg.content === "__thinking__";
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5
                          ${isUser 
                            ? 'bg-[#C9A44C] text-[#09090B]' 
                            : 'bg-zinc-800 text-[#C9A44C]'
                          }
                        `}>
                          {isUser ? <User size={16} /> : <Bot size={16} />}
                        </div>

                        {/* Message Content */}
                        <div className={`rounded-2xl px-4 sm:px-6 py-3 sm:py-4 ${
                          isUser 
                            ? 'bg-[#C9A44C] text-[#09090B]' 
                            : 'bg-[#121212] border border-[#1f1f1f] text-zinc-200'
                        }`}>
                          {isThinking ? (
                            <div className="flex gap-1.5 py-2">
                              <span className="w-2 h-2 rounded-full bg-[#C9A44C] animate-bounce"></span>
                              <span className="w-2 h-2 rounded-full bg-[#C9A44C] animate-bounce [animation-delay:.2s]"></span>
                              <span className="w-2 h-2 rounded-full bg-[#C9A44C] animate-bounce [animation-delay:.4s]"></span>
                            </div>
                          ) : isUser ? (
                            <p className="text-sm sm:text-base font-medium whitespace-pre-wrap break-words">
                              {msg.content}
                            </p>
                          ) : (
                            <div className="relative group">
                              <div className="prose prose-invert prose-sm sm:prose-base max-w-none
                                prose-headings:text-white prose-headings:font-bold
                                prose-h1:text-xl sm:prose-h1:text-2xl
                                prose-h2:text-lg sm:prose-h2:text-xl
                                prose-h3:text-base sm:prose-h3:text-lg
                                prose-p:text-zinc-300 prose-p:leading-relaxed
                                prose-strong:text-white prose-strong:font-semibold
                                prose-ul:text-zinc-300 prose-ul:space-y-1
                                prose-ol:text-zinc-300 prose-ol:space-y-1
                                prose-li:text-zinc-300
                                prose-li:marker:text-[#C9A44C]
                                prose-code:text-[#C9A44C]
                                prose-code:bg-zinc-800
                                prose-code:px-1.5
                                prose-code:py-0.5
                                prose-code:rounded
                                prose-code:text-sm
                                prose-code:font-mono
                                prose-pre:bg-zinc-800
                                prose-pre:border
                                prose-pre:border-zinc-700
                                prose-pre:rounded-xl
                                prose-pre:p-4
                                prose-pre:overflow-x-auto
                                prose-a:text-[#C9A44C]
                                prose-a:hover:underline
                                prose-a:font-medium
                                prose-blockquote:border-l-[#C9A44C]
                                prose-blockquote:text-zinc-400
                                prose-blockquote:bg-zinc-800/30
                                prose-blockquote:px-4
                                prose-blockquote:py-2
                                prose-blockquote:rounded-r-lg
                                prose-hr:border-zinc-700
                                prose-strong:text-white
                              ">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.content}
                                </ReactMarkdown>
                              </div>
                              <button
                                onClick={() => copyToClipboard(msg.content, index)}
                                className="absolute top-1 right-1 p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                {copiedIndex === index ? (
                                  <Check size={14} className="text-emerald-400" />
                                ) : (
                                  <Copy size={14} className="text-zinc-400" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-zinc-800/50 bg-zinc-900/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your document..."
                  className="w-full rounded-xl sm:rounded-2xl border border-[#1f1f1f] bg-[#121212] px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-zinc-500 outline-none focus:border-[#C9A44C] transition-colors"
                  disabled={sendMessageMutation.isPending}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="true"
                />
                {sendMessageMutation.isPending && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 size={18} className="animate-spin text-[#C9A44C]" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!message.trim() || sendMessageMutation.isPending}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2
                  ${message.trim() && !sendMessageMutation.isPending
                    ? 'bg-[#C9A44C] text-[#09090B] hover:bg-[#D4B45C] shadow-lg shadow-[#C9A44C]/20' 
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }
                `}
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-zinc-600">
                Press <kbd className="px-1.5 py-0.5 bg-[#121212] border border-[#1f1f1f] rounded text-[9px]">Enter</kbd> to send
              </p>
              <p className="text-[10px] text-zinc-600">
                {message.length > 0 && `${message.length} characters`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3d3d3d;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: #4d4d4d;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #2a2a2a transparent;
        }

        .custom-scrollbar {
          scroll-behavior: smooth;
        }

        @media (hover: hover) {
          .custom-scrollbar {
            scrollbar-width: thin;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: transparent;
          }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background: #2a2a2a;
          }
        }

        @media (hover: none) {
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2a2a2a;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}