export type ChatSender = "user" | "support";

export type ChatMessage = {
  id: string;
  sender: ChatSender;
  content: string;
  createdAt: string;
};
