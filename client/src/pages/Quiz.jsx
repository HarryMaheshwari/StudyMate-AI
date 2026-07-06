import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import useQuiz from "../hooks/useQuiz";

export default function Quiz() {
  const { id } = useParams();

  const { data, isLoading } = useQuiz(id);

  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  const questions = data.questions;

  const question = questions[current];

  const handleSelect = (index) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [current]: index,
    }));
  };

  const score = questions.reduce((total, q, index) => {
    return (
      total +
      (selectedAnswers[index] === q.correctAnswer ? 1 : 0)
    );
  }, 0);

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-4xl space-y-8">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">

            <h1 className="text-5xl font-bold">
              Quiz Finished 🎉
            </h1>

            <p className="mt-6 text-3xl">
              Score
            </p>

            <h2 className="mt-4 text-7xl font-bold text-green-400">
              {score} / {questions.length}
            </h2>

            <p className="mt-4 text-zinc-400">
              {Math.round(
                (score / questions.length) * 100
              )}
              % Correct
            </p>

          </div>

          <div className="space-y-6">

            {questions.map((q, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-semibold">
                  {index + 1}. {q.question}
                </h3>

                <p className="mt-4">

                  Your Answer:

                  <span
                    className={`ml-2 font-semibold ${
                      selectedAnswers[index] ===
                      q.correctAnswer
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {q.options[
                      selectedAnswers[index]
                    ] || "Not Answered"}
                  </span>

                </p>

                <p className="mt-2">

                  Correct Answer:

                  <span className="ml-2 font-semibold text-green-400">
                    {
                      q.options[
                        q.correctAnswer
                      ]
                    }
                  </span>

                </p>

                <p className="mt-4 text-zinc-400">
                  {q.explanation}
                </p>

              </div>
            ))}

          </div>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-4xl space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            {data.title}
          </h1>

          <p className="mt-2 text-zinc-400">
            Question {current + 1} of {questions.length}
          </p>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full bg-blue-500 transition-all"
            style={{
              width: `${
                ((current + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />

        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <h2 className="text-2xl font-semibold">
            {question.question}
          </h2>

          <div className="mt-8 space-y-4">

            {question.options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSelect(index)
                  }
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selectedAnswers[
                      current
                    ] === index
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {option}
                </button>
              )
            )}

          </div>

        </div>

        <div className="flex justify-between">

          <button
            disabled={current === 0}
            onClick={() =>
              setCurrent(current - 1)
            }
            className="rounded-xl bg-zinc-800 px-6 py-3 disabled:opacity-50"
          >
            Previous
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={() =>
                setSubmitted(true)
              }
              className="rounded-xl bg-green-600 px-6 py-3"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrent(current + 1)
              }
              className="rounded-xl bg-blue-600 px-6 py-3"
            >
              Next
            </button>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}