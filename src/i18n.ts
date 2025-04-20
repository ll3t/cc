import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      catalog: "Product Catalog",
      products: "Products",
      contact: "Contact",
      admin: "Admin",
      addProduct: "Add Product",
      editProduct: "Edit Product",
      productName: "Product Name",
      price: "Price",
      imageUrl: "Image URL",
      category: "Category",
      description: "Description",
      update: "Update",
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this product?",
      productList: "Product List",
      contactUs: "Contact Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      messageSent: "Message sent successfully!",
      productAdded: "Product added successfully!",
      productUpdated: "Product updated successfully!",
      productDeleted: "Product deleted successfully!",
      error: "An error occurred. Please try again.",
    },
  },
  ar: {
    translation: {
      catalog: "كتالوج المنتجات",
      products: "المنتجات",
      contact: "اتصل بنا",
      admin: "لوحة التحكم",
      addProduct: "إضافة منتج",
      editProduct: "تعديل المنتج",
      productName: "اسم المنتج",
      price: "السعر",
      imageUrl: "رابط الصورة",
      category: "الفئة",
      description: "الوصف",
      update: "تحديث",
      add: "إضافة",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      confirmDelete: "هل أنت متأكد من حذف هذا المنتج؟",
      productList: "قائمة المنتجات",
      contactUs: "اتصل بنا",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      send: "إرسال",
      messageSent: "تم إرسال الرسالة بنجاح!",
      productAdded: "تم إضافة المنتج بنجاح!",
      productUpdated: "تم تحديث المنتج بنجاح!",
      productDeleted: "تم حذف المنتج بنجاح!",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
