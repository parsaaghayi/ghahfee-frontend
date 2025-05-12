export default function EmptyState({ message = "موردی یافت نشد." }: { message?: string }) {
  return (
    <div className="text-center text-gray-400 py-12 text-lg font-mikhak">
      {message}
    </div>
  );
} 