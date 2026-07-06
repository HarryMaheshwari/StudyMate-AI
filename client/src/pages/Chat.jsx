import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import DashboardLayout from "../layouts/DashboardLayout";

import useChat from "../hooks/useChat";
import useSendMessage from "../hooks/useSendMessage";

export default function Chat() {
  const { id } = useParams();

  const { data, isLoading } = useChat(id);

  const sendMessageMutation =
  useSendMessage(id);

  const [message, setMessage] = useState("");

  const bottomRef = useRef(null);

  const messages = data?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

   sendMessageMutation.mutate(message);

    setMessage("");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mx-auto flex h-[85vh] max-w-6xl flex-col">

        {/* Header */}

        <div className="border-b border-zinc-800 pb-6">

          <h1 className="text-4xl font-bold">
            Chat with PDF
          </h1>

          <p className="mt-2 text-zinc-400">
            Ask anything from your uploaded document.
          </p>

        </div>

        {/* Messages */}

        <div className="mt-8 flex-1 space-y-6 overflow-y-auto pr-3">

          {messages.length === 0 && (

            <div className="mt-32 text-center">

              <h2 className="text-3xl font-bold">
                👋 Start asking questions
              </h2>

              <p className="mt-4 text-zinc-500">

                Examples:

              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">

                <button
                  onClick={() =>
                    setMessage(
                      "Summarize this document."
                    )
                  }
                  className="rounded-full border border-zinc-700 px-5 py-3 hover:border-cyan-500"
                >
                  Summarize this PDF
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "Explain the first chapter."
                    )
                  }
                  className="rounded-full border border-zinc-700 px-5 py-3 hover:border-cyan-500"
                >
                  Explain first chapter
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "Important exam questions?"
                    )
                  }
                  className="rounded-full border border-zinc-700 px-5 py-3 hover:border-cyan-500"
                >
                  Important Questions
                </button>

              </div>

            </div>

          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
            
              <div
                className={`max-w-[80%] rounded-3xl px-6 py-5 ${
                  msg.role === "user"
                    ? "bg-cyan-600"
                    : "border border-zinc-800 bg-zinc-900"
                }`}
              >

                {msg.content === "__thinking__" ? (

  <div className="flex gap-2">

    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500"></span>

    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:.2s]"></span>

    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:.4s]"></span>

  </div>

) : msg.role === "assistant" ? (

  <div className="prose prose-invert max-w-none">

    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {msg.content}
    </ReactMarkdown>

  </div>

) : (

  <p>{msg.content}</p>

)}

              </div>

            </div>

          ))}
          <div ref={bottomRef} />

        </div>

        {/* Input */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex gap-4 border-t border-zinc-800 pt-6"
        >

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask anything..."
            className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 outline-none focus:border-cyan-500"
          />

          <button
            disabled={sendMessageMutation.isPending}
            className="rounded-2xl bg-cyan-600 px-8 py-4 font-semibold hover:bg-cyan-500 disabled:opacity-50"
          >
            Send
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}