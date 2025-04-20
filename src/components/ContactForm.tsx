import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactForm() {
  const { t } = useTranslation();
  const submit = useMutation(api.contacts.submit);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit(formData);
      setFormData({ name: "", email: "", message: "" });
      toast.success(t("messageSent"));
    } catch (error) {
      toast.error(t("error"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("contactUs")}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("name")}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 bg-white dark:bg-gray-600"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("email")}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 bg-white dark:bg-gray-600"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("message")}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 bg-white dark:bg-gray-600"
            rows={4}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("send")}
        </button>
      </form>
    </motion.div>
  );
}
