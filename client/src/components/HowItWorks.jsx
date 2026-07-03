import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  FileText,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Document",
    description:
      "Upload PDFs, DOCX or PPT files securely.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our AI understands your study material in seconds.",
  },
  {
    icon: FileText,
    title: "Generate Notes",
    description:
      "Create summaries, flashcards and quizzes instantly.",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description:
      "Practice quizzes and monitor your improvement.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative mx-auto max-w-7xl px-6 py-28"
    >
      <div className="text-center">
        <p className="font-medium text-blue-400">
          HOW IT WORKS
        </p>

        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          Learn Smarter in
          <br />
          Four Simple Steps
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
          From uploading your notes to practicing AI-generated
          quizzes, everything happens in just a few clicks.
        </p>
      </div>

      {/* Desktop Timeline */}
      <div className="relative mt-24 hidden md:block">

        <div className="absolute left-0 right-0 top-10 h-px bg-zinc-800" />

        <div className="grid grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
                  <Icon className="text-blue-400" size={34} />
                </div>

                <div className="mt-8">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Mobile */}
      <div className="mt-16 space-y-8 md:hidden">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/15">
                <Icon className="text-blue-400" />
              </div>

              <span className="mt-5 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm">
                0{index + 1}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-2 text-zinc-400">
                {step.description}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
}