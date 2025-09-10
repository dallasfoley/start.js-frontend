import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full gap-[32px] sm:items-start md:items-center justify-center ">
      <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
        Welcome to <span className="text-blue-600">start.js!</span>
      </h1>
      <p className="text-zinc-700 dark:text-zinc-300 text-lg max-w-lg">
        Get started with JavaScript in seconds. Explore our curated JavaScript
        projects and start coding right away.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="secondary" asChild>
          <Link href="/login">Sign-In</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/register">Sign-Up</Link>
        </Button>
      </div>
    </main>
  );
}
