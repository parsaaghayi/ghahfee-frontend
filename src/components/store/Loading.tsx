export default function Loading() {
  return (
    <div className="flex justify-center items-center py-12">
      <span className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary border-t-4"></span>
      <span className="ml-3 text-primary font-bold">در حال بارگذاری...</span>
    </div>
  );
} 