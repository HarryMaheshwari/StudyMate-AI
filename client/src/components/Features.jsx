import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  GraduationCap,
  Layers3,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Upload Documents",
    description:
      "Upload PDFs, DOCX, or PPT files and let AI analyze them instantly.",
  },
  {
    icon: Brain,
    title: "AI Smart Notes",
    description:
      "Generate concise notes and summaries in seconds.",
  },
  {
    icon: GraduationCap,
    title: "AI Quiz Generator",
    description:
      "Create MCQs automatically from your uploaded documents.",
  },
  {
    icon: Layers3,
    title: "Flashcards",
    description:
      "Revise faster with AI-generated flashcards.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor quizzes, notes, and study performance.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Cloud Storage",
    description:
      "Access your study material anytime from anywhere.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      <div className="text-center">
        <p className="text-blue-400 font-medium">
          FEATURES
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold">
          Everything You Need
          <br />
          to Study Smarter
        </h2>

        <p className="mt-5 text-zinc-400 max-w-2xl mx-auto">
          StudyMate AI combines AI-powered learning tools into
          one modern platform built for students.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7 transition duration-300 hover:border-blue-500 hover:-translate-y-2"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15">
                <Icon size={28} className="text-blue-400" />
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-zinc-400 leading-7">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}