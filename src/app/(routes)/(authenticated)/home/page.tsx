import HomePageForm from "@/components/authenticated/home/home-page-form";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100 mt-4 md:mt-8 lgmt-12">
        Bootstrap a JavaScript project quicker than ever
      </h1>
      <HomePageForm />
    </main>
  );
}
