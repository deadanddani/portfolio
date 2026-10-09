import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatLauncher from "./components/ChatLauncher";
import { LanguageProvider } from "./i18n";

const queryClient = new QueryClient();

export const BASENAME = "/portfolio";

// Shared by the browser entry (main.tsx) and the build-time prerender (entry-server.tsx),
// so the prerendered markup matches what the client hydrates.
export const AppShell = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
        <ChatLauncher />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AppShell>
    <BrowserRouter basename={BASENAME}>
      <AppRoutes />
    </BrowserRouter>
  </AppShell>
);

export default App;
