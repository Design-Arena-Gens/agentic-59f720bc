"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend, FiWifiOff, FiShield, FiClock } from "react-icons/fi";
import { useChatStream } from "@/hooks/use-chat-stream";
import type { ChatMessage } from "@/types/chat";

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-md ${
          isUser
            ? "rounded-br-sm bg-[var(--color-primary)] text-white"
            : "rounded-bl-sm bg-white/90 text-foreground backdrop-blur dark:bg-white/10"
        }`}
      >
        <p>{message.content}</p>
        <span className="mt-2 block text-xs font-medium text-white/70">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}

export function SupportChat() {
  const { messages, sendMessage, connected, error } = useChatStream();
  const [draft, setDraft] = useState("");
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setDraft("");
  };

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[min(70vh,560px)] flex-col rounded-[32px] border border-[var(--color-border)] bg-gradient-to-b from-white/90 via-white/60 to-white/70 shadow-xl backdrop-blur dark:from-white/5 dark:via-white/5 dark:to-white/5">
      <header className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Support team</h1>
          <p className="text-xs text-[var(--color-muted)]">
            Chat live with our Kathmandu concierge desk.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)]">
          <div
            className={`h-2 w-2 rounded-full ${
              connected ? "bg-[var(--color-secondary)]" : "bg-[var(--color-muted)]"
            }`}
          />
          {connected ? "Live" : "Connecting…"}
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div className="mx-auto flex max-w-[85%] flex-col items-center gap-2 rounded-3xl border border-white/40 bg-white/70 px-4 py-3 text-center text-xs text-[var(--color-muted)] backdrop-blur dark:bg-white/10">
          <FiShield className="text-lg text-[var(--color-secondary)]" />
          Conversations are encrypted and mapped to your verified KYC profile.
        </div>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        {error && (
          <div className="flex items-center gap-2 rounded-2xl bg-[color-mix(in_srgb,var(--color-warm)_14%,white)] px-4 py-3 text-xs font-semibold text-[color-mix(in_srgb,var(--color-warm)_80%,black)]">
            <FiWifiOff />
            {error}
          </div>
        )}
        <div ref={scrollAnchorRef} />
      </div>

      <footer className="space-y-3 border-t border-white/60 px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <FiClock />
          Typically replies within 2 minutes · Available 07:00 - 22:00 NPT
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type your question in Nepali or English…"
            className="flex-1 rounded-full border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
          />
          <button
            type="submit"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30 transition hover:translate-y-[-1px]"
          >
            <FiSend />
          </button>
        </form>
      </footer>
    </div>
  );
}
