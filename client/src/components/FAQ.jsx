import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What file types are supported?",
    answer: "You can upload PDF, DOCX and PPT files.",
  },
  {
    question: "How does the AI generate notes?",
    answer: "Our AI analyzes your document and creates concise summaries, key points and study material.",
  },
  {
    question: "Can I generate quizzes?",
    answer: "Yes. StudyMate AI automatically creates MCQs and practice questions from your notes.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Your files are securely stored and accessible only from your account.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-4xl px-6 py-28"
    >
      <div className="text-center mb-16">
        <p className="text-blue-400 font-medium">
          FAQ
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-800 bg-zinc-900"
          >
            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="font-semibold">
                {faq.question}
              </span>

              <ChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="px-6 pb-6 text-zinc-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}