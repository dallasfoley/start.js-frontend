export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-zinc-900 min-h-screen w-full flex items-center justify-center">
      {children}
    </main>
  );
}
