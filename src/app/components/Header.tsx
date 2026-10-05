import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

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
       <UserInfo/>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;