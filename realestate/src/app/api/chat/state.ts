import type { ChatMessage } from "@/types/chat";

export type ChatSubscriber = (message: ChatMessage) => void;

export type ChatState = {
  messages: ChatMessage[];
  subscribers: Set<ChatSubscriber>;
};

declare global {
  var chatState: ChatState | undefined;
}

export function getChatState(): ChatState {
  if (!global.chatState) {
    global.chatState = {
      messages: [
        {
          id: crypto.randomUUID(),
          sender: "support",
          content:
            "Namaste! Tap the bottom navigation to explore curated homes or ask for help any time. हामी साथमा छौं।",
          createdAt: new Date().toISOString(),
        },
      ],
      subscribers: new Set(),
    };
  }

  return global.chatState;
}

export function broadcast(message: ChatMessage) {
  const state = getChatState();
  state.messages = [...state.messages, message].slice(-200);
  state.subscribers.forEach((subscriber) => subscriber(message));
}
