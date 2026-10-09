import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import "@/styles/cinematic-blueprint.css";
import "@/styles/chat-launcher.css";
import { useLang } from "@/i18n";

// Salesforce Enhanced Chat (Embedded Messaging) is set up in index.html with
// hideChatButtonOnLoad = true and its bootstrap script loaded lazily after page load.
// This button replaces the default one: it shows immediately and, if clicked before
// the chat is ready, loads it on demand and opens it as soon as it is.
// API: https://developer.salesforce.com/docs/service/messaging-web/guide/launch-chat.html
type ChatState = { ready: boolean; open: boolean; requested: boolean };

declare global {
  interface Window {
    __chatState?: ChatState;
    loadEmbeddedMessaging?: () => void;
    embeddedservice_bootstrap?: { utilAPI?: { launchChat: () => Promise<unknown> } };
  }
}

// Give up waiting for Salesforce after this long and let the user retry.
const LOAD_TIMEOUT_MS = 20000;

const launchChat = (): Promise<boolean> => {
  const api = window.embeddedservice_bootstrap?.utilAPI;
  if (!api) return Promise.resolve(false);
  return api
    .launchChat()
    .then(() => true)
    .catch((err) => {
      console.error("Error launching Embedded Messaging: ", err);
      return false;
    });
};

const ChatLauncher = () => {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const launch = () => launchChat().then((ok) => ok && setOpen(true));

  useEffect(() => {
    setMounted(true);
    // Events may have fired before mount; index.html records them in window.__chatState.
    if (window.__chatState) {
      setReady(window.__chatState.ready);
      setOpen(window.__chatState.open);
    }

    const onReady = () => setReady(true);
    const onOpen = () => setOpen(true);
    const onClosed = () => setOpen(false);
    const onError = () => setPending(false);

    window.addEventListener("onEmbeddedMessagingButtonCreated", onReady);
    window.addEventListener("onEmbeddedMessagingWindowMaximized", onOpen);
    window.addEventListener("onEmbeddedMessagingWindowClosed", onClosed);
    window.addEventListener("embeddedMessagingLoadError", onError);
    return () => {
      window.removeEventListener("onEmbeddedMessagingButtonCreated", onReady);
      window.removeEventListener("onEmbeddedMessagingWindowMaximized", onOpen);
      window.removeEventListener("onEmbeddedMessagingWindowClosed", onClosed);
      window.removeEventListener("embeddedMessagingLoadError", onError);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Clicked before the chat was ready: open it as soon as Salesforce finishes loading.
  useEffect(() => {
    if (!pending || !ready) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPending(false);
    launchChat().then((ok) => ok && setOpen(true));
  }, [pending, ready]);

  const onClick = () => {
    if (ready) {
      launch();
      return;
    }
    if (pending) return;
    setPending(true);
    window.loadEmbeddedMessaging?.();
    timeoutRef.current = window.setTimeout(() => {
      setPending(false);
      console.error("Embedded Messaging did not become ready in time.");
    }, LOAD_TIMEOUT_MS);
  };

  // Rendered client-side only (not in the prerendered HTML), since it needs JavaScript.
  // While the chat is open (maximized or minimized) Salesforce shows its own window/pill.
  if (!mounted || open) return null;

  return (
    <button
      type="button"
      className="cb-btn cb-btn-primary cb-chat-launcher"
      onClick={onClick}
      aria-label={pending ? t({ en: "Loading chat", es: "Cargando chat" }) : t({ en: "Open chat", es: "Abrir chat" })}
      aria-haspopup="dialog"
      aria-busy={pending}
    >
      {pending ? (
        <Loader2 aria-hidden="true" className="cb-chat-icon cb-chat-spin" />
      ) : (
        <MessageCircle aria-hidden="true" className="cb-chat-icon" />
      )}
      <span className="cb-chat-label">{pending ? t({ en: "Loading…", es: "Cargando…" }) : "Chat"}</span>
    </button>
  );
};

export default ChatLauncher;
