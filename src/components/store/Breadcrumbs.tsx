type BreadcrumbsProps = {
  items: { label: string; href: string }[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1">
      {items.map((item, idx) => (
        <span key={item.href} className="flex items-center">
          <a href={item.href} className="hover:underline text-primary font-semibold">{item.label}</a>
          {idx < items.length - 1 && <span className="mx-2 text-gray-300">/</span>}
        </span>
      ))}
    </nav>
  );
} 