"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

interface ProductFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    categories: string[];
    tags: string[];
    images: string[];
    is_active: boolean;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
  };
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export default function ProductForm({ initialData, onClose }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('خطا در دریافت دسته‌بندی‌ها');
      }
      return response.json();
    }
  });

  const { data: tags } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await fetch('/api/tags');
      if (!response.ok) {
        throw new Error('خطا در دریافت برچسب‌ها');
      }
      return response.json();
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      price: 0,
      stock: 0,
      categories: [],
      tags: [],
      is_active: true,
      seo_title: '',
      seo_description: '',
      seo_keywords: ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const url = initialData?.id ? `/api/products/${initialData.id}` : '/api/products';
      const method = initialData?.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          images
        }),
      });

      if (!response.ok) {
        throw new Error('خطا در ذخیره محصول');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i]);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('خطا در آپلود تصاویر');
      }

      const data = await response.json();
      setImages([...images, ...data.urls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">اطلاعات اصلی</h3>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              نام محصول
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { required: 'نام محصول الزامی است' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              توضیحات
            </label>
            <textarea
              id="description"
              rows={4}
              {...register('description', { required: 'توضیحات الزامی است' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                قیمت (تومان)
              </label>
              <input
                type="number"
                id="price"
                {...register('price', { 
                  required: 'قیمت الزامی است',
                  min: { value: 0, message: 'قیمت نمی‌تواند منفی باشد' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                موجودی
              </label>
              <input
                type="number"
                id="stock"
                {...register('stock', { 
                  required: 'موجودی الزامی است',
                  min: { value: 0, message: 'موجودی نمی‌تواند منفی باشد' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Categories and Tags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">دسته‌بندی و برچسب‌ها</h3>

          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
              دسته‌بندی‌ها
            </label>
            <select
              id="categories"
              multiple
              {...register('categories')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              برچسب‌ها
            </label>
            <select
              id="tags"
              multiple
              {...register('tags')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              وضعیت
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('is_active')}
                  className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                <span className="mr-2 text-sm text-gray-700">فعال</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">تصاویر</h3>
        
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            آپلود تصاویر جدید
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100"
          />
          {uploading && (
            <p className="mt-1 text-sm text-gray-500">در حال آپلود...</p>
          )}
        </div>
      </div>

      {/* SEO Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">اطلاعات SEO</h3>

        <div>
          <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700">
            عنوان SEO
          </label>
          <input
            type="text"
            id="seo_title"
            {...register('seo_title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700">
            توضیحات SEO
          </label>
          <textarea
            id="seo_description"
            rows={2}
            {...register('seo_description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="seo_keywords" className="block text-sm font-medium text-gray-700">
            کلمات کلیدی
          </label>
          <input
            type="text"
            id="seo_keywords"
            {...register('seo_keywords')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Form Actions */}
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
          disabled={mutation.isPending}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {mutation.isPending ? 'در حال ذخیره...' : 'ذخیره'}
        </button>
      </div>
    </form>
  );
} 