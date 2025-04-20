import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  return (
    <motion.select
      whileHover={{ scale: 1.05 }}
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </motion.select>
  );
}
