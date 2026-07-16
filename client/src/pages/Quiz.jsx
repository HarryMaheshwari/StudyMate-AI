import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Loader2, CheckCircle, XCircle, 
  Award, Sparkles, AlertCircle, Send, 
  ChevronDown, Clock, FileText, Trophy, Target
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useQuiz from "../hooks/useQuiz";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuiz(id);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const resultsRef = useRef(null);

  const questions = data?.questions || [];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (submitted && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [submitted]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="animate-spin text-zinc-500" size={40} />
        </div>
      </DashboardLayout>
    );
  }

  if (!data?.questions || data.questions.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4">
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-3xl p-10 max-w-md">
            <AlertCircle size={56} className="text-zinc-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">No Quiz Available</h3>
            <p className="text-zinc-400 text-sm mb-6">Generate a quiz for this document to test your knowledge.</p>
            <button 
              onClick={() => navigate(`/documents/${id}`)}
              className="px-6 py-3 bg-[#C9A44C] text-[#09090B] rounded-xl font-medium hover:bg-[#D4B45C] transition-colors w-full"
            >
              Back to Document
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSelect = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    const answered = Object.keys(selectedAnswers).length;
    if (answered < totalQuestions) {
      if (!confirm(`You've answered ${answered} out of ${totalQuestions} questions. Submit anyway?`)) {
        return;
      }
    }
    setSubmitted(true);
  };

  const calculateScore = () => {
    if (!questions.length) return 0;
    return questions.reduce((total, q, index) => {
      return total + (selectedAnswers[index] === q.correctAnswer ? 1 : 0);
    }, 0);
  };

  const score = calculateScore();
  const percentage = questions.length ? Math.round((score / totalQuestions) * 100) : 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === totalQuestions;

  const getLetter = (index) => String.fromCharCode(65 + index);

  // Results Page
  if (submitted) {
    return (
      <DashboardLayout>
        <div className="w-full min-h-screen bg-zinc-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Back Button */}
            <button 
              onClick={() => navigate(`/documents/${id}`)} 
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Document</span>
            </button>

            {/* Results Header - Large & Prominent */}
            <motion.div 
              ref={resultsRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-[#1f1f1f] rounded-3xl p-8 sm:p-10 lg:p-12 text-center mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[#C9A44C]/10 flex items-center justify-center">
                  <Trophy size={48} className="text-[#C9A44C]" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                Quiz Complete! 🎉
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base">Here's how you performed on this quiz</p>

              {/* Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 max-w-2xl mx-auto">
                <div className="bg-[#1A1A1E] rounded-2xl p-6 border border-[#1f1f1f]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target size={20} className="text-[#C9A44C]" />
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Score</p>
                  </div>
                  <p className="text-4xl sm:text-5xl font-bold text-white">
                    {score} <span className="text-xl text-zinc-500">/ {totalQuestions}</span>
                  </p>
                </div>
                <div className="bg-[#1A1A1E] rounded-2xl p-6 border border-[#1f1f1f]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award size={20} className="text-[#C9A44C]" />
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Accuracy</p>
                  </div>
                  <p className={`text-4xl sm:text-5xl font-bold ${
                    percentage >= 80 ? 'text-emerald-400' :
                    percentage >= 60 ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {percentage}%
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/50 max-w-2xl mx-auto">
                <p className="text-sm">
                  {percentage >= 80 && (
                    <span className="text-emerald-400">🌟 Excellent! You're a master of this material!</span>
                  )}
                  {percentage >= 60 && percentage < 80 && (
                    <span className="text-amber-400">📚 Good job! Review the ones you missed below.</span>
                  )}
                  {percentage < 60 && (
                    <span className="text-red-400">💪 Keep practicing! Review the material and try again.</span>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmitted(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-[#C9A44C] text-[#09090B] rounded-xl font-medium hover:bg-[#D4B45C] transition-colors w-full sm:w-auto"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => navigate(`/documents/${id}`)}
                  className="px-8 py-3 bg-[#1A1A1E] border border-[#1f1f1f] text-zinc-400 hover:text-white rounded-xl font-medium hover:border-zinc-700 transition-colors w-full sm:w-auto"
                >
                  Back to Document
                </button>
              </div>
            </motion.div>

            {/* Review Answers */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText size={16} />
                Review Your Answers
              </h2>
              {questions.map((q, qIndex) => {
                const selected = selectedAnswers[qIndex];
                const isCorrect = selected === q.correctAnswer;
                const isAnswered = selected !== undefined;
                
                return (
                  <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIndex * 0.05 }}
                    className={`bg-[#121212] border rounded-2xl p-5 sm:p-6 transition-all duration-200
                      ${isCorrect 
                        ? 'border-emerald-500/30 bg-emerald-500/5' 
                        : isAnswered 
                        ? 'border-red-500/30 bg-red-500/5'
                        : 'border-[#1f1f1f]'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isCorrect ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle size={18} className="text-emerald-400" />
                          </div>
                        ) : isAnswered ? (
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <XCircle size={18} className="text-red-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-zinc-600 flex items-center justify-center">
                            <span className="text-xs text-zinc-500">?</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white">
                          {qIndex + 1}. {q.question}
                        </h3>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-500 text-xs">Your answer:</span>
                            <span className={`font-medium ${
                              isCorrect ? 'text-emerald-400' : 
                              isAnswered ? 'text-red-400' : 'text-zinc-500'
                            }`}>
                              {isAnswered ? q.options[selected] : 'Not answered'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500 text-xs">Correct answer:</span>
                              <span className="font-medium text-emerald-400">
                                {q.options[q.correctAnswer]}
                              </span>
                            </div>
                          )}
                          {q.explanation && (
                            <div className="mt-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                              <p className="text-xs text-zinc-400">
                                <span className="font-medium text-zinc-300">💡 Explanation:</span> {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Active Quiz - Full page
  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-zinc-900">
        {/* Top Navigation */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button 
                onClick={() => navigate(`/documents/${id}`)} 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Back to Document</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#C9A44C]" />
                <h1 className="text-sm sm:text-base font-semibold text-white truncate max-w-[120px] sm:max-w-xs">
                  {data?.title || "Quiz"}
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="hidden sm:inline">{totalQuestions} questions</span>
                <span className="sm:hidden">{totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Full width with padding */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Progress Overview */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-400">Progress</span>
              <span className="text-sm font-medium text-white">
                {answeredCount} / {totalQuestions} answered
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#C9A44C] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-zinc-500">
              <span>{isComplete ? '✅ All answered!' : `${totalQuestions - answeredCount} remaining`}</span>
              <span>{Math.round((answeredCount / totalQuestions) * 100)}%</span>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const selected = selectedAnswers[qIndex];
              const isAnswered = selected !== undefined;
              
              return (
                <motion.div
                  key={qIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIndex * 0.05 }}
                  className={`bg-[#121212] border rounded-2xl p-5 sm:p-7 transition-all duration-200
                    ${isAnswered 
                      ? 'border-[#C9A44C]/30 bg-[#C9A44C]/5' 
                      : 'border-[#1f1f1f]'
                    }
                  `}
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#C9A44C]/10 text-[#C9A44C] flex items-center justify-center text-sm font-bold">
                      {qIndex + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                        {q.question}
                      </h3>
                    </div>
                    {isAnswered && (
                      <CheckCircle size={18} className="text-[#C9A44C] flex-shrink-0 mt-1" />
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-3 ml-12">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selected === oIndex;
                      
                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleSelect(qIndex, oIndex)}
                          disabled={submitted}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left
                            ${isSelected 
                              ? 'border-[#C9A44C] bg-[#C9A44C]/10' 
                              : 'border-[#1f1f1f] hover:border-zinc-600 hover:bg-zinc-800/30'
                            }
                          `}
                        >
                          <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors
                            ${isSelected 
                              ? 'bg-[#C9A44C] text-[#09090B]' 
                              : 'bg-zinc-800 text-zinc-400'
                            }
                          `}>
                            {getLetter(oIndex)}
                          </span>
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                            {option}
                          </span>
                          {isSelected && (
                            <CheckCircle size={16} className="ml-auto text-[#C9A44C] flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Submit Button - Sticky at bottom */}
          <div className="sticky bottom-0 pt-6 pb-20 mt-8 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200 shadow-lg
                ${isComplete 
                  ? 'bg-[#C9A44C] text-[#09090B] hover:bg-[#D4B45C] shadow-[#C9A44C]/20' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }
              `}
            >
              <div className="flex items-center justify-center gap-3">
                <Send size={20} />
                <span>{isComplete ? 'Submit Quiz' : `Submit (${answeredCount}/${totalQuestions})`}</span>
              </div>
            </motion.button>
            {!isComplete && (
              <p className="text-center text-xs text-zinc-500 mt-3">
                {totalQuestions - answeredCount} question{totalQuestions - answeredCount !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}