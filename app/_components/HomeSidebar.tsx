import Image from "next/image";
import close from "@/public/svgs/close.svg";

export function HomeSidebar({
  isMenuOpen,
  sidebarRef,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  sidebarRef: React.RefObject<HTMLElement | null> | null;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <aside
      className={`fixed z-20 right-0 top-0 xs:hidden flex flex-col h-screen w-40 border-l border-gray-200 bg-white p-4 ${isMenuOpen ? "block" : "hidden"}`}
      ref={sidebarRef}
    >
      <button
        type="button"
        className="hover:cursor-pointer self-end"
        aria-label="Close menu"
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <Image src={close} alt="Close menu" className="size-5" />
      </button>

      <div className="flex flex-col gap-y-2.5 mt-2 text-sm">
        {/*TODO Replace with ul>li><Link> when all routes have been created */}
        <p>Route 1</p>
        <p>Route 2</p>
        <p>Route 3</p>
        <p>Route 4</p>
      </div>
    </aside>
  );
}
