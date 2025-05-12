import StoreMenu from "./Menu";

export default function StoreHeader() {
  return (
    <header className="w-full bg-white/90 backdrop-blur shadow-md flex flex-col md:flex-row items-center justify-between px-6 py-3 sticky top-0 z-30 gap-2">
      <div className="font-mikhak text-2xl font-extrabold text-primary drop-shadow">قهفی</div>
      <StoreMenu />
    </header>
  );
}
