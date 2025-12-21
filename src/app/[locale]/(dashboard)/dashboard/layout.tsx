import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import Provider from "@/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body>
        <Provider>
          <div className="flex items-center justify-center min-h-screen flex-col">
            <main className="flex flex-1 flex-col items-center">
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
