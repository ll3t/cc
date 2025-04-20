import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </motion.button>
  );
}
