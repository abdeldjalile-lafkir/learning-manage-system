import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
