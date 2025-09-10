import { MessageCircleCodeIcon, CogIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-selector";

export default function NavBar() {
  return (
    <nav className="w-full top-0 h-12 text-zinc-900 dark:text-white border-b border-zinc-300 flex items-center px-4">
      <div className="text-2xl font-bold">
        <span className="text-blue-600">Start</span>.js
      </div>
      <div className="ml-auto flex items-center gap-6">
        <Link
          href="/dashboard"
          className="text-sm font-semibold transition duration-300 hover:text-red-600"
        >
          <MessageCircleCodeIcon />
        </Link>
        <Link
          href="/settings"
          className="text-sm font-semibold transition duration-300 hover:text-red-600"
        >
          <CogIcon />
        </Link>
        <ModeToggle />
        <Link
          href="/"
          className="text-sm font-semibold transition duration-300 hover:text-red-600"
        >
          <LogOutIcon />
        </Link>
      </div>
    </nav>
  );
}
