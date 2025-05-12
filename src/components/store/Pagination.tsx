type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <div className="flex gap-2 justify-center my-6">
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i}
          className={`px-4 py-1 rounded-lg border font-bold transition ${
            page === i + 1
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-primary border-gray-200 hover:bg-primary/10'
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
} 