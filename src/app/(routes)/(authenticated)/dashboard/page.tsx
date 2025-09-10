import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
        Welcome
      </h1>
      <Textarea className="mt-4 w-1/2" placeholder="This is a textarea" />
    </main>
  );
}
