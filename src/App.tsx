import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProductList from "./components/ProductList";
import AdminPanel from "./components/AdminPanel";
import ContactForm from "./components/ContactForm";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSwitch from "./components/LanguageSwitch";

export default function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState("products");
  const [theme, setTheme] = useState("light");
  
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("catalog")}
        </h2>
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <LanguageSwitch />
          <SignOutButton />
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {["products", "contact", "admin"].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`py-4 px-3 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {t(page)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Unauthenticated>
                <div className="max-w-md mx-auto">
                  <SignInForm />
                </div>
              </Unauthenticated>
              
              <Authenticated>
                {currentPage === "products" && <ProductList />}
                {currentPage === "contact" && <ContactForm />}
                {currentPage === "admin" && <AdminPanel />}
              </Authenticated>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
