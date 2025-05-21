type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  // الگوریتم نمایش صفحات به صورت حرفه‌ای
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (page > 4) pages.push('...');
    for (let i = Math.max(2, page - 2); i <= Math.min(pageCount - 1, page + 2); i++) {
      pages.push(i);
    }
    if (page < pageCount - 3) pages.push('...');
    pages.push(pageCount);
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex gap-1 items-center overflow-x-auto px-2">
      <button
        className="px-3 py-1 rounded-lg border font-bold transition bg-white text-primary border-gray-200 hover:bg-primary/10 disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        قبلی
      </button>
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={`page-${p}-${i}`}
            className={`px-3 py-1 rounded-lg border font-bold transition ${
              page === p
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-gray-200 hover:bg-primary/10'
            }`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">...</span>
        )
      )}
      <button
        className="px-3 py-1 rounded-lg border font-bold transition bg-white text-primary border-gray-200 hover:bg-primary/10 disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
      >
        بعدی
      </button>
    </div>
  );
} 