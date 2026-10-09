import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/i18n";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t({ en: "Oops! Page not found", es: "¡Vaya! Página no encontrada" })}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {t({ en: "Return to Home", es: "Volver al inicio" })}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
