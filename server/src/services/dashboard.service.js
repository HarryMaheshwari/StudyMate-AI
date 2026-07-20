import Document from "../models/document.model.js";
import Note from "../models/note.model.js";
import Quiz from "../models/quiz.model.js";
import Flashcard from "../models/flashcard.model.js";

export const getDashboardData = async (userId) => {
  const [
    documentCount,
    noteCount,
    quizCount,
    flashcardCount,
    recentDocuments,
  ] = await Promise.all([
    Document.countDocuments({ owner: userId }),

    Note.countDocuments({ owner: userId }),

    Quiz.countDocuments({ owner: userId }),

    Flashcard.countDocuments({ owner: userId }),

    Document.find({ owner: userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("title createdAt updatedAt"),
  ]);

  const continueLearning =
    recentDocuments.length > 0 ? recentDocuments[0] : null;

  return {
    documents: documentCount,
    notes: noteCount,
    quizzes: quizCount,
    flashcards: flashcardCount,

    // We'll implement this later.
    studyStreak: 0,

    continueLearning,

    recentDocuments,
  };
};