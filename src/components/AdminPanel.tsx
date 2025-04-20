
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminPanel() {
  const { t } = useTranslation();
  const products = useQuery(api.products.list, { category: undefined }) || [];
  const addProduct = useMutation(api.products.add);
  const updateProduct = useMutation(api.products.update);
  const removeProduct = useMutation(api.products.remove);

  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProduct({ id: editing._id, ...formData, price: Number(formData.price) });
        toast.success("تم تحديث المنتج بنجاح");
      } else {
        await addProduct({ ...formData, price: Number(formData.price) });
        toast.success("تمت إضافة المنتج");
      }
      setFormData({ name: "", description: "", price: "", image: "", category: "" });
      setEditing(null);
    } catch {
      toast.error("حدث خطأ");
    }
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setEditing(product);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md space-y-4 border border-gray-200">
        <h3 className="text-lg font-bold text-teal-700">{editing ? "تعديل منتج" : "إضافة منتج"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم المنتج" className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="text" placeholder="الوصف" className="input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type="number" placeholder="السعر" className="input" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          <input type="text" placeholder="رابط الصورة" className="input" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          <input type="text" placeholder="الفئة" className="input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        </div>
        <button type="submit" className="bg-teal-500 text-white py-2 px-6 rounded-xl hover:bg-teal-600 transition duration-200">
          {editing ? "حفظ التعديلات" : "إضافة"}
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <motion.div key={product._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="font-semibold text-teal-600">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm text-gray-600 font-bold mt-1">{product.price} ريال</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button onClick={() => handleEdit(product)} className="text-sm text-blue-500 hover:underline">تعديل</button>
              <button onClick={() => removeProduct({ id: product._id })} className="text-sm text-red-500 hover:underline">حذف</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
