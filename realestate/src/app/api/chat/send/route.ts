import { NextResponse } from "next/server";
import { broadcast, getChatState } from "@/app/api/chat/state";
import type { ChatMessage } from "@/types/chat";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => undefined) as
    | { sender: "user" | "support"; content: string }
    | undefined;

  if (!payload?.content || payload.content.trim().length === 0) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  const message: ChatMessage = {
    id: crypto.randomUUID(),
    sender: payload.sender ?? "user",
    content: payload.content.trim(),
    createdAt: new Date().toISOString(),
  };

  broadcast(message);

  if (message.sender === "user") {
    setTimeout(() => {
      const state = getChatState();
      const latestUserMessage = state.messages.at(-1);
      if (latestUserMessage?.sender !== "user") {
        return;
      }
      const replies = [
        "धन्यवाद! We'll review your request and respond shortly.",
        "Our support guide will call you within the next few minutes.",
        "Sharing a curated deck for your preferred region. Kindly keep notifications on.",
      ];
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "support",
        content: replies[Math.floor(Math.random() * replies.length)],
        createdAt: new Date().toISOString(),
      };
      broadcast(reply);
    }, 1800);
  }

  return NextResponse.json({ ok: true });
}
