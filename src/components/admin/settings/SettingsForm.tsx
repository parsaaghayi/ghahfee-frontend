"use client";

import { useState, useEffect } from "react";
import FormDialog from "../FormDialog";

interface SettingsFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  settings?: any;
}

export default function SettingsForm({ open, onClose, onSubmit, settings }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    site_name: "",
    site_description: "",
    site_keywords: "",
    site_logo: "",
    site_favicon: "",
    contact_email: "",
    contact_phone: "",
    contact_address: "",
    social_instagram: "",
    social_telegram: "",
    social_whatsapp: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        site_name: settings.site_name || "",
        site_description: settings.site_description || "",
        site_keywords: settings.site_keywords || "",
        site_logo: settings.site_logo || "",
        site_favicon: settings.site_favicon || "",
        contact_email: settings.contact_email || "",
        contact_phone: settings.contact_phone || "",
        contact_address: settings.contact_address || "",
        social_instagram: settings.social_instagram || "",
        social_telegram: settings.social_telegram || "",
        social_whatsapp: settings.social_whatsapp || "",
      });
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="تنظیمات سایت"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">
            نام سایت
          </label>
          <input
            type="text"
            id="site_name"
            name="site_name"
            value={formData.site_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">
            توضیحات سایت
          </label>
          <textarea
            id="site_description"
            name="site_description"
            rows={3}
            value={formData.site_description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="site_keywords" className="block text-sm font-medium text-gray-700">
            کلمات کلیدی
          </label>
          <input
            type="text"
            id="site_keywords"
            name="site_keywords"
            value={formData.site_keywords}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
            ایمیل تماس
          </label>
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
            شماره تماس
          </label>
          <input
            type="tel"
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="contact_address" className="block text-sm font-medium text-gray-700">
            آدرس
          </label>
          <textarea
            id="contact_address"
            name="contact_address"
            rows={2}
            value={formData.contact_address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="social_instagram" className="block text-sm font-medium text-gray-700">
            اینستاگرام
          </label>
          <input
            type="url"
            id="social_instagram"
            name="social_instagram"
            value={formData.social_instagram}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="social_telegram" className="block text-sm font-medium text-gray-700">
            تلگرام
          </label>
          <input
            type="url"
            id="social_telegram"
            name="social_telegram"
            value={formData.social_telegram}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="social_whatsapp" className="block text-sm font-medium text-gray-700">
            واتساپ
          </label>
          <input
            type="url"
            id="social_whatsapp"
            name="social_whatsapp"
            value={formData.social_whatsapp}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            ذخیره
          </button>
        </div>
      </form>
    </FormDialog>
  );
} 