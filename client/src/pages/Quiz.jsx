import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Loader2, CheckCircle, XCircle, 
  Award, Sparkles, AlertCircle, Send, 
  ChevronDown, Clock, FileText, Trophy, Target,
  Zap, Brain, BarChart3, ListChecks, X
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import useQuiz from "../hooks/useQuiz";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuiz(id);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
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

  const handleSubmitClick = () => {
    const answered = Object.keys(selectedAnswers).length;
    if (answered === 0) {
      setShowSubmitModal(true);
      return;
    }
    if (answered < totalQuestions) {
      setShowSubmitModal(true);
      return;
    }
    confirmSubmit();
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    setSubmitted(true);
    setShowExplanations(true);
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
        <div className="w-full min-h-screen bg-zinc-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Back Button */}
            <button 
              onClick={() => navigate(`/documents/${id}`)} 
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Document</span>
            </button>

            {/* Results Header */}
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
                    setShowExplanations(false);
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <ListChecks size={16} />
                  Review Your Answers
                </h2>
                <span className="text-xs text-zinc-500">
                  {score} correct • {totalQuestions - score} incorrect
                </span>
              </div>
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
                          {!isCorrect && isAnswered && (
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500 text-xs">Correct answer:</span>
                              <span className="font-medium text-emerald-400">
                                {q.options[q.correctAnswer]}
                              </span>
                            </div>
                          )}
                          {q.explanation && showExplanations && (
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

  // Active Quiz
  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-zinc-950 rounded-none md:rounded-2xl lg:rounded-3xl overflow-hidden">
        {/* Top Navigation */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              <button 
                onClick={() => navigate(`/documents/${id}`)} 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Quiz</span>
              </div>
              <span className="text-xs text-zinc-500">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-0.5 bg-zinc-800">
          <motion.div 
            className="h-full bg-[#C9A44C]"
            initial={{ width: 0 }}
            animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          {/* Progress Overview */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <span className="text-zinc-400">
              <span className="text-white font-medium">{answeredCount}</span> of {totalQuestions} answered
            </span>
            <span className="text-zinc-500">
              {Math.round((answeredCount / totalQuestions) * 100)}%
            </span>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.map((q, qIndex) => {
              const selected = selectedAnswers[qIndex];
              const isAnswered = selected !== undefined;
              
              return (
                <motion.div
                  key={qIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIndex * 0.05 }}
                  className={`bg-[#121212] border rounded-xl p-4 sm:p-5 transition-all duration-200
                    ${isAnswered 
                      ? 'border-[#C9A44C]/30 bg-[#C9A44C]/5' 
                      : 'border-[#1f1f1f]'
                    }
                  `}
                >
                  {/* Question */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold
                      ${isAnswered 
                        ? 'bg-[#C9A44C] text-[#09090B]' 
                        : 'bg-zinc-800 text-zinc-500'
                      }
                    `}>
                      {qIndex + 1}
                    </span>
                    <h3 className="text-sm font-medium text-white leading-relaxed">
                      {q.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 ml-9">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selected === oIndex;
                      
                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleSelect(qIndex, oIndex)}
                          disabled={submitted}
                          className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg border transition-all duration-200 text-left
                            ${isSelected 
                              ? 'border-[#C9A44C] bg-[#C9A44C]/10' 
                              : 'border-[#1f1f1f] hover:border-zinc-600 hover:bg-zinc-800/30'
                            }
                          `}
                        >
                          <span className={`flex-shrink-0 w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-medium
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
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitClick}
              className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-200
                ${answeredCount > 0
                  ? 'bg-[#C9A44C] text-[#09090B] hover:bg-[#D4B45C] shadow-lg shadow-[#C9A44C]/20' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }
              `}
            >
              <div className="flex items-center justify-center gap-2">
                <Send size={16} />
                <span>{answeredCount === totalQuestions ? 'Submit Quiz' : `Submit (${answeredCount}/${totalQuestions})`}</span>
              </div>
            </motion.button>
            {!isComplete && answeredCount > 0 && (
              <p className="text-center text-[10px] text-zinc-500 mt-2">
                {totalQuestions - answeredCount} question{totalQuestions - answeredCount !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubmitModal(false)}
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
                  onClick={() => setShowSubmitModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <AlertCircle size={28} className="text-amber-400" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  {answeredCount === 0 ? 'No answers selected!' : 'Submit quiz?'}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-zinc-400 text-center mb-6">
                  {answeredCount === 0 
                    ? 'You haven\'t answered any questions yet. Are you sure you want to submit?'
                    : `You've answered ${answeredCount} out of ${totalQuestions} questions. ${totalQuestions - answeredCount} question${totalQuestions - answeredCount !== 1 ? 's' : ''} remaining.`
                  }
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    Continue Quiz
                  </button>
                  <button
                    onClick={confirmSubmit}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors
                      ${answeredCount === 0 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-[#C9A44C] hover:bg-[#D4B45C] text-[#09090B]'
                      }
                    `}
                  >
                    {answeredCount === 0 ? 'Submit Anyway' : 'Submit Quiz'}
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