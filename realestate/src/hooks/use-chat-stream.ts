"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chat";

type ServerEvent =
  | { type: "init"; payload: ChatMessage[] }
  | { type: "message"; payload: ChatMessage };

const supportsNotification = () =>
  typeof window !== "undefined" && "Notification" in window;

function maybeNotify(message: ChatMessage) {
  if (!supportsNotification()) return;
  if (message.sender !== "support") return;
  if (Notification.permission !== "granted") return;
  if (document.visibilityState === "visible") return;

  navigator.serviceWorker
    .getRegistration()
    .then((registration) => {
      if (registration) {
        registration.showNotification("Support replied", {
          body: message.content,
          icon: "/favicon.ico",
          tag: "support-chat",
        });
      } else {
        new Notification("Support replied", { body: message.content });
      }
    })
    .catch(() => new Notification("Support replied", { body: message.content }));
}

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>();
  const lastMessageId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const source = new EventSource("/api/chat/stream");

    source.onopen = () => {
      setConnected(true);
      setError(undefined);
    };

    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as ServerEvent;
        if (payload.type === "init") {
          setMessages(payload.payload);
          const latest = payload.payload.at(-1);
          if (latest) {
            lastMessageId.current = latest.id;
          }
        } else if (payload.type === "message") {
          setMessages((current) => {
            const exists = current.some((message) => message.id === payload.payload.id);
            if (exists) return current;
            const next = [...current, payload.payload].slice(-100);
            return next;
          });
          const { payload: message } = payload;
          if (lastMessageId.current !== message.id) {
            maybeNotify(message);
            lastMessageId.current = message.id;
          }
        }
      } catch (err) {
        console.error("Failed to parse chat event", err);
      }
    };

    source.onerror = () => {
      setConnected(false);
      setError("Connection lost. Retrying…");
      source.close();
      setTimeout(() => {
        setError(undefined);
        setConnected(false);
      }, 3000);
    };

    return () => {
      source.close();
    };
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    await fetch("/api/chat/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender: "user", content }),
    });
  };

  return {
    messages,
    connected,
    error,
    sendMessage,
  };
}
