"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle as ChatIcon, X } from "lucide-react";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

type Question =
  | { text: string; key: "name" | "phone"; type: "text" }
  | { text: string; key: "mood" | "interest"; type: "options"; options: string[] };

const questions: Question[] = [
  { text: "What's your name?", key: "name", type: "text" },
  { text: "Please share your contact number.", key: "phone", type: "text" },
  {
    text: "What's your travel mood?",
    key: "mood",
    type: "options",
    options: ["Relaxing", "Adventure", "Cultural"],
  },
  {
    text: "What kind of destinations interest you?",
    key: "interest",
    type: "options",
    options: ["Mountains", "Beaches", "Cities"],
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = () => {
    setOpen(true);
    setMessages([
      { from: "bot", text: "Hello! I'm AllTripp bot." },
      { from: "bot", text: "Before we start, let's get a few details." },
      { from: "bot", text: questions[0].text },
    ]);
    setStep(0);
    setIsTyping(false);
    setAnswers({});
  };

  const handleOption = (value: string) => {
    const q = questions[step];
    setMessages((m) => [...m, { from: "user", text: value }]);
    setAnswers((a) => ({ ...a, [q.key]: value }));

    if (step + 1 < questions.length) {
      const next = questions[step + 1];
      setIsTyping(true);
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: next.text }]);
        setIsTyping(false);
        setStep(step + 1);
      }, 450);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { from: "bot", text: "Thanks for the info! We'll contact you in a few hours." },
        ]);
        setIsTyping(false);
        setStep(step + 1);
      }, 450);
    }
  };

  const renderOptions = () => {
    const q = questions[step];
    if (!q) return null;
    if (isTyping) return null;

    if (q.type === "options") {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleOption(opt)}
              className="rounded-full border border-yellow-400/40 bg-yellow-100/60 px-3 py-2 text-xs font-semibold text-gray-900 hover:bg-yellow-200 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const inputEl = e.currentTarget.elements.namedItem("reply") as HTMLInputElement | null;
          const value = inputEl?.value.trim();
          if (value) {
            handleOption(value);
            if (inputEl) inputEl.value = "";
          }
        }}
        className="mt-3"
      >
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <input
            name="reply"
            type={q.key === "phone" ? "tel" : "text"}
            placeholder="Type your answer..."
            className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 transition"
          >
            Send
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      {!open && (
        <button
          onClick={startConversation}
          className="chat-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-[0_12px_30px_rgba(234,179,8,0.35)] hover:scale-[1.03] transition"
          aria-label="Open chat"
        >
          <ChatIcon className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="chat-panel fixed bottom-6 right-6 z-50 w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur">
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">AT</div>
              <div>
                <p className="text-sm font-semibold tracking-wide">AllTripp Receptionist</p>
                <p className="text-xs text-white/70">Personal travel assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="max-h-[360px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`chat-bubble max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.from === "bot"
                      ? "chat-bubble--bot bg-gray-100 text-gray-900"
                      : "chat-bubble--user bg-yellow-400 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-bubble chat-bubble--bot bg-gray-100 px-4 py-2 text-sm text-gray-900 shadow-sm">
                  <div className="chat-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
}
