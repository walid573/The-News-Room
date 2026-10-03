import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <header className="relative mx-auto w-full max-w-7xl px-4 py-4">
      <div className="grid grid-cols-3 items-center justify-between gap-3">
        <div className="col-span-1">

        </div>
        {/* Left: logo + title + date */}
        <Link href="/" className="flex items-center justify-center gap-3">
          <Image
            src="/logo.webp"
            alt="Bangla News 24"
            width={40}
            height={40}
            priority
            className="rounded-lg"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-2xl font-bold text-red-700">
              Bangla News 24
            </span>
            <span className="text-xs text-neutral-500">{date}</span>
          </div>
        </Link>

        {/* Right: auth buttons */}
        <div className="flex items-center justify-end gap-3 text-sm">
          <Link
            href="/signin"
            className="text-neutral-700 transition-colors hover:text-red-700"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="rounded bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;