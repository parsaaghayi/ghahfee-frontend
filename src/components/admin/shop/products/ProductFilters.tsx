"use client";

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search?: string;
    category?: string[];
    tag?: string[];
    minPrice?: string;
    maxPrice?: string;
    minStock?: string;
    maxStock?: string;
    status?: string;
  }) => void;
  filters: {
    search?: string;
    category?: string[];
    tag?: string[];
    minPrice?: string;
    maxPrice?: string;
    minStock?: string;
    maxStock?: string;
    status?: string;
  };
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  showSelectedBadges?: boolean;
  products?: { categories?: { id: string }[]; tags?: { id: string }[] }[];
}

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

// debounce utility
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function ProductFilters(props: ProductFiltersProps) {
  const { onFilterChange } = props;
  const [filters, setFilters] = useState({
    search: '',
    category: [] as string[],
    tag: [] as string[],
    minPrice: '',
    maxPrice: '',
    minStock: '',
    maxStock: '',
    status: 'all'
  });
  const [categorySearch, setCategorySearch] = useState('');
  const [categoryResults, setCategoryResults] = useState<Category[]>(props.categories.slice(0, 20));
  const [categoryLoading, setCategoryLoading] = useState(false);
  const debouncedCategorySearch = useDebouncedValue(categorySearch, 400);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showTagList, setShowTagList] = useState(false);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // استخراج دسته‌بندی‌ها و تگ‌های محصولات فعلی (همیشه name داشته باشند)
  const productCategories = props.products?.flatMap(p => (p.categories || []).map(c => ({ id: c.id, name: (c as any).name || c.id }))).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i) || [];
  const productTags = props.products?.flatMap(p => (p.tags || []).map(t => ({ id: t.id, name: (t as any).name || t.id }))).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i) || [];

  const categoriesList: Category[] = Array.from(new Map([
    ...[...props.categories, ...productCategories].map((c): [string, Category] => [c.id, c]),
    ...filters.category.map((cid): [string, Category] => {
      const found = [...props.categories, ...productCategories].find(c => c.id === cid);
      return [cid, found || { id: cid, name: cid }];
    })
  ]).values());
  const tagsList: Tag[] = Array.from(new Map([
    ...[...props.tags, ...productTags].map((t): [string, Tag] => [t.id, t]),
    ...filters.tag.map((tid): [string, Tag] => {
      const found = [...props.tags, ...productTags].find(t => t.id === tid);
      return [tid, found || { id: tid, name: tid }];
    })
  ]).values());

  // دسته‌بندی
  useEffect(() => {
    if (debouncedCategorySearch.length > 2) {
      setCategoryLoading(true);
      fetch(`/api/categories?name=${encodeURIComponent(debouncedCategorySearch)}&per_page=20`)
        .then(res => res.json())
        .then(data => {
          setCategoryResults(data.data || []);
          setCategoryLoading(false);
        });
    } else {
      setCategoryResults(props.categories.slice(0, 20));
    }
  }, [debouncedCategorySearch, props.categories]);

  // تگ
  const [tagSearch, setTagSearch] = useState('');
  const [tagResults, setTagResults] = useState<Tag[]>(props.tags.slice(0, 20));
  const [tagLoading, setTagLoading] = useState(false);
  const debouncedTagSearch = useDebouncedValue(tagSearch, 400);
  useEffect(() => {
    if (debouncedTagSearch.length > 2) {
      setTagLoading(true);
      fetch(`/api/tags?name=${encodeURIComponent(debouncedTagSearch)}&per_page=20`)
        .then(res => res.json())
        .then(data => {
          setTagResults(data.data || []);
          setTagLoading(false);
        });
    } else {
      setTagResults(props.tags.slice(0, 20));
    }
  }, [debouncedTagSearch, props.tags]);

  // multi-select دسته‌بندی
  const updateCategories = (cat: Category) => {
    let newSelected;
    if (filters.category.includes(cat.id)) {
      newSelected = filters.category.filter((id) => id !== cat.id);
    } else {
      newSelected = [...filters.category, cat.id];
    }
    setFilters({ ...filters, category: newSelected });
  };
  // multi-select برچسب
  const updateTags = (tag: Tag) => {
    let newSelected;
    if (filters.tag.includes(tag.id)) {
      newSelected = filters.tag.filter((id) => id !== tag.id);
    } else {
      newSelected = [...filters.tag, tag.id];
    }
    setFilters({ ...filters, tag: newSelected });
  };

  // دکمه اعمال فیلتر
  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  // همگام‌سازی state داخلی با props.filters
  useEffect(() => {
    setFilters({
      search: props.filters.search ?? '',
      category: props.filters.category ?? [],
      tag: props.filters.tag ?? [],
      minPrice: props.filters.minPrice ?? '',
      maxPrice: props.filters.maxPrice ?? '',
      minStock: props.filters.minStock ?? '',
      maxStock: props.filters.maxStock ?? '',
      status: props.filters.status ?? 'all',
    });
  }, [props.filters, props.showSelectedBadges]);

  // state برای نگهداری nameهای fetch شده
  const [fetchedCategoryNames, setFetchedCategoryNames] = useState<Record<string, string>>({});
  const [fetchedTagNames, setFetchedTagNames] = useState<Record<string, string>>({});

  // useEffect برای fetch name دسته‌بندی‌های ناشناخته
  useEffect(() => {
    const unknownCategoryIds = filters.category.filter(cid => {
      const inList = categoriesList.find(c => c.id === cid && c.name && c.name !== cid);
      return !inList && !fetchedCategoryNames[cid];
    });
    if (unknownCategoryIds.length > 0) {
      fetch(`/api/categories?id=${unknownCategoryIds.join(',')}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            const newNames: Record<string, string> = {};
            data.data.forEach((cat: any) => {
              newNames[cat.id] = cat.name;
            });
            setFetchedCategoryNames(prev => ({ ...prev, ...newNames }));
          }
        });
    }
  }, [filters.category, categoriesList, fetchedCategoryNames]);

  // useEffect برای fetch name تگ‌های ناشناخته
  useEffect(() => {
    const unknownTagIds = filters.tag.filter(tid => {
      const inList = tagsList.find(t => t.id === tid && t.name && t.name !== tid);
      return !inList && !fetchedTagNames[tid];
    });
    if (unknownTagIds.length > 0) {
      fetch(`/api/tags?id=${unknownTagIds.join(',')}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            const newNames: Record<string, string> = {};
            data.data.forEach((tag: any) => {
              newNames[tag.id] = tag.name;
            });
            setFetchedTagNames(prev => ({ ...prev, ...newNames }));
          }
        });
    }
  }, [filters.tag, tagsList, fetchedTagNames]);

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-base font-semibold text-gray-900 mb-2">فیلترها</h3>

      <div>
        <label htmlFor="search" className="block text-xs font-medium text-gray-700 mb-1">جستجو</label>
        <input
          type="text"
          id="search"
          name="search"
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          placeholder="جستجو در نام و توضیحات..."
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">دسته‌بندی</label>
        <div className="relative">
          <input
            type="text"
            ref={categoryInputRef}
            value={categorySearch}
            onChange={e => {
              setCategorySearch(e.target.value);
              setShowCategoryList(true);
            }}
            onFocus={() => setShowCategoryList(true)}
            onBlur={() => setTimeout(() => setShowCategoryList(false), 150)}
            placeholder="جستجو در دسته‌بندی‌ها..."
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
          />
          {showCategoryList && (
            <ul className="absolute z-10 bg-white border border-gray-200 rounded w-full max-h-40 overflow-y-auto mt-1">
              <li
                className="px-4 py-2 text-gray-500 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setFilters({ ...filters, category: [] });
                  setCategorySearch('');
                  setShowCategoryList(false);
                }}
              >
                همه دسته‌بندی‌ها
              </li>
              {categoryLoading ? (
                <li className="px-4 py-2 text-gray-400">در حال جستجو...</li>
              ) : (
                categoryResults.map((category: Category) => (
                <li
                  key={category.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${filters.category.includes(category.id) ? 'bg-green-200' : ''}`}
                  onClick={() => {
                    updateCategories(category);
                    setCategorySearch('');
                  }}
                >
                  {category.name}
                </li>
                ))
              )}
            </ul>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.category.map(cid => {
              const cat = categoriesList.find(c => c.id === cid);
              const name = cat?.name && cat.name !== cid ? cat.name : fetchedCategoryNames[cid];
              if (!name) return null;
              return (
                <span key={cid} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  {name}
                  <button onClick={() => setFilters(f => ({ ...f, category: f.category.filter(id => id !== cid) }))} className="ml-1 text-red-500">×</button>
              </span>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="tag" className="block text-xs font-medium text-gray-700 mb-1">برچسب</label>
        <div className="relative">
          <input
            type="text"
            ref={tagInputRef}
            value={tagSearch}
            onChange={e => {
              setTagSearch(e.target.value);
              setShowTagList(true);
            }}
            onFocus={() => setShowTagList(true)}
            onBlur={() => setTimeout(() => setShowTagList(false), 150)}
            placeholder="جستجو در برچسب‌ها..."
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
          />
          {showTagList && (
            <ul className="absolute z-10 bg-white border border-gray-200 rounded w-full max-h-40 overflow-y-auto mt-1">
              <li
                className="px-4 py-2 text-gray-500 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setFilters({ ...filters, tag: [] });
                  setTagSearch('');
                  setShowTagList(false);
                }}
              >
                همه برچسب‌ها
              </li>
              {tagLoading ? (
                <li className="px-4 py-2 text-gray-400">در حال جستجو...</li>
              ) : (
                tagResults.map((tag: Tag) => (
                <li
                  key={tag.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${filters.tag.includes(tag.id) ? 'bg-green-200' : ''}`}
                  onClick={() => {
                    updateTags(tag);
                    setTagSearch('');
                  }}
                >
                  {tag.name}
                </li>
                ))
              )}
            </ul>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.tag.map(tid => {
              const tag = tagsList.find(t => t.id === tid);
              const name = tag?.name && tag.name !== tid ? tag.name : fetchedTagNames[tid];
              if (!name) return null;
              return (
                <span key={tid} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  {name}
                  <button onClick={() => setFilters(f => ({ ...f, tag: f.tag.filter(id => id !== tid) }))} className="ml-1 text-red-500">×</button>
              </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minPrice" className="block text-xs font-medium text-gray-700 mb-1">حداقل قیمت</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))}
            placeholder="0"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-xs font-medium text-gray-700 mb-1">حداکثر قیمت</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
            placeholder="1000000"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minStock" className="block text-xs font-medium text-gray-700 mb-1">حداقل موجودی</label>
          <input
            type="number"
            id="minStock"
            name="minStock"
            value={filters.minStock}
            onChange={e => setFilters(f => ({ ...f, minStock: e.target.value }))}
            placeholder="0"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="maxStock" className="block text-xs font-medium text-gray-700 mb-1">حداکثر موجودی</label>
          <input
            type="number"
            id="maxStock"
            name="maxStock"
            value={filters.maxStock}
            onChange={e => setFilters(f => ({ ...f, maxStock: e.target.value }))}
            placeholder="100"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">وضعیت</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs py-2 px-3"
        >
          <option value="all">همه</option>
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
        </select>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-bold"
        >
          اعمال فیلتر
        </button>
      </div>
    </div>
  );
} 