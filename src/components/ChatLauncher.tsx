import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import "@/styles/cinematic-blueprint.css";
import "@/styles/chat-launcher.css";

// Salesforce Enhanced Chat (Embedded Messaging) is loaded from index.html with
// hideChatButtonOnLoad = true. This replaces its default floating button.
// API: https://developer.salesforce.com/docs/service/messaging-web/guide/launch-chat.html
type ChatState = { ready: boolean; open: boolean };

declare global {
  interface Window {
    __chatState?: ChatState;
    embeddedservice_bootstrap?: { utilAPI?: { launchChat: () => Promise<unknown> } };
  }
}

const ChatLauncher = () => {
  const [state, setState] = useState<ChatState>({ ready: false, open: false });

  useEffect(() => {
    // Events may have fired before mount; index.html records them in window.__chatState.
    if (window.__chatState) setState({ ...window.__chatState });

    const onReady = () => setState((s) => ({ ...s, ready: true }));
    const onOpen = () => setState((s) => ({ ...s, open: true }));
    const onClosed = () => setState((s) => ({ ...s, open: false }));

    window.addEventListener("onEmbeddedMessagingButtonCreated", onReady);
    window.addEventListener("onEmbeddedMessagingWindowMaximized", onOpen);
    window.addEventListener("onEmbeddedMessagingWindowClosed", onClosed);
    return () => {
      window.removeEventListener("onEmbeddedMessagingButtonCreated", onReady);
      window.removeEventListener("onEmbeddedMessagingWindowMaximized", onOpen);
      window.removeEventListener("onEmbeddedMessagingWindowClosed", onClosed);
    };
  }, []);

  const launch = () => {
    const api = window.embeddedservice_bootstrap?.utilAPI;
    if (!api) return;
    api
      .launchChat()
      .then(() => setState((s) => ({ ...s, open: true })))
      .catch((err) => console.error("Error launching Embedded Messaging: ", err));
  };

  // While the chat is open (maximized or minimized) Salesforce shows its own window/pill.
  if (!state.ready || state.open) return null;

  return (
    <button
      type="button"
      className="cb-btn cb-btn-primary cb-chat-launcher"
      onClick={launch}
      aria-label="Open chat"
      aria-haspopup="dialog"
    >
      <MessageCircle aria-hidden="true" className="cb-chat-icon" />
      <span className="cb-chat-label">Chat</span>
    </button>
  );
};

export default ChatLauncher;
