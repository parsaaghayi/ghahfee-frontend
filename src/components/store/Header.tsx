import StoreMenu from "./Menu";
import { Menu } from "@/types/menu";

export default function StoreHeader({ menus }: { menus: Menu[] }) {
  return (
    <header className="w-full bg-white/50 backdrop-blur shadow-md flex md:flex-row items-center justify-between px-6 py-3 sticky top-0 z-30 gap-2">
      <StoreMenu menus={menus} />
      <div className="font-mikhak text-2xl font-extrabold text-primary drop-shadow">
        قهفی
      </div>
    </header>
  );
}
