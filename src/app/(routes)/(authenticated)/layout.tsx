import NavBar from "@/components/authenticated/navbar";
import { ThemeProvider } from "@/providers/theme-provider";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <NavBar />
        {children}
      </ThemeProvider>
    </main>
  );
}
