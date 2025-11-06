import { getChatState } from "@/app/api/chat/state";
import type { ChatMessage } from "@/types/chat";

export const runtime = "nodejs";

const textEncoder = new TextEncoder();

export async function GET(request: Request) {
  const { messages, subscribers } = getChatState();

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (event: unknown) => {
        controller.enqueue(textEncoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      sendEvent({ type: "init", payload: messages });
      const subscriber = (message: ChatMessage) => {
        sendEvent({ type: "message", payload: message });
      };
      subscribers.add(subscriber);

      const abort = () => {
        subscribers.delete(subscriber);
        controller.close();
      };

      request.signal.addEventListener("abort", abort);
    },
    cancel() {
      subscribers.clear();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
