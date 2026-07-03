import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  LayoutDashboard,
  Upload,
  GraduationCap,
  BarChart3,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <div className="text-center">
        <p className="font-medium text-blue-400">
          PRODUCT PREVIEW
        </p>

        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          Everything in
          <br />
          One Dashboard
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
          Manage your documents, generate AI notes, practice quizzes
          and monitor your learning progress from one beautiful dashboard.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
        className="mt-20 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
      >

        <div className="grid md:grid-cols-[260px_1fr]">

          {/* Sidebar */}

          <aside className="border-r border-zinc-800 bg-zinc-950 p-6">

            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Brain />
              </div>

              <div>
                <h3 className="font-bold">
                  StudyMate AI
                </h3>

                <p className="text-sm text-zinc-500">
                  Dashboard
                </p>
              </div>
            </div>

            <div className="space-y-3">

              <div className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3">
                <LayoutDashboard size={18}/>
                Dashboard
              </div>

              <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800">
                <Upload size={18}/>
                Upload
              </div>

              <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800">
                <FileText size={18}/>
                Notes
              </div>

              <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800">
                <GraduationCap size={18}/>
                Quiz
              </div>

              <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800">
                <BarChart3 size={18}/>
                Analytics
              </div>

            </div>

          </aside>

          {/* Content */}

          <div className="p-8">

            <div className="grid gap-6 lg:grid-cols-3">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="font-semibold">
                  Uploaded Files
                </h3>

                <div className="mt-5 space-y-3">

                  <div className="rounded-lg bg-zinc-900 p-3">
                    AI.pdf
                  </div>

                  <div className="rounded-lg bg-zinc-900 p-3">
                    DBMS Notes.pdf
                  </div>

                  <div className="rounded-lg bg-zinc-900 p-3">
                    Operating System.pdf
                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                <h3 className="font-semibold">
                  AI Generated
                </h3>

                <div className="mt-5 space-y-3">

                  <div className="rounded-xl bg-blue-600/10 p-4">
                    ✅ 24 Notes Generated
                  </div>

                  <div className="rounded-xl bg-green-600/10 p-4">
                    ✅ 55 Flashcards
                  </div>

                  <div className="rounded-xl bg-purple-600/10 p-4">
                    ✅ 30 MCQs Ready
                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                <h3 className="font-semibold">
                  Weekly Progress
                </h3>

                <div className="mt-8 flex h-44 items-end justify-between gap-2">

                  {[35,60,40,75,90,65,100].map((h,i)=>(
                    <div
                      key={i}
                      className="w-full rounded-t-xl bg-gradient-to-t from-blue-700 to-cyan-400"
                      style={{height:`${h}%`}}
                    />
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}