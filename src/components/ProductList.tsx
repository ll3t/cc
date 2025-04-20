
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ProductList() {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<"SAR" | "USD">("SAR");
  const products = useQuery(api.products.list, { category: undefined }) || [];

  const formatPrice = (price: number) => {
    const rate = currency === "SAR" ? 3.75 : 1;
    const symbol = currency === "SAR" ? "ر.س" : "$";
    return `${symbol} ${(price * rate).toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">{t("products")}</h1>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as "SAR" | "USD")}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="SAR">ريال سعودي</option>
          <option value="USD">دولار أمريكي</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-semibold text-teal-600 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-1">{product.description}</p>
            <p className="text-teal-700 font-bold">{formatPrice(product.price)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
