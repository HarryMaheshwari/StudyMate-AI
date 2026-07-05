import { Sparkles } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function WelcomeBanner() {
  const { data: user } = useAuth();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8">

      {/* Background Blur */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">

        <div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            <Sparkles size={16} />
            AI Powered Learning
          </div>

          <h1 className="text-4xl font-bold">
            Welcome back,
            <br />
            {user?.fullName} 👋
          </h1>

          <p className="mt-4 max-w-xl text-zinc-400">
            Upload study materials, generate AI notes, flashcards and quizzes,
            and track your learning journey—all in one place.
          </p>

        </div>

        <div className="hidden lg:block">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h3 className="mb-3 text-lg font-semibold">
              Today's Goal
            </h3>

            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">
                Study Progress
              </span>

              <span>
                0%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div className="h-full w-0 rounded-full bg-blue-500" />

            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Upload your first PDF to begin.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}