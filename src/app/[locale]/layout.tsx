import Provider from "@/providers";
import type { Metadata } from "next";
import "@/app/[locale]/globals.css";
import { Cairo } from "next/font/google";
import { Inter } from "next/font/google";

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

export const metadata: Metadata = {
  title: {
    default: "LMS - Private Tutoring & Support Lessons Management System",
    template: "%s | LMS",
  },
  description:
    "A modern, scalable Learning Management System for private tutoring with support for multiple roles, bilingual functionality, and comprehensive course management.",
  keywords: [
    "LMS",
    "Learning Management System",
    "Private Tutoring",
    "Online Education",
    "Course Management",
    "Student Management",
    "Teacher Portal",
    "E-Learning",
  ],
  authors: [{ name: "LMS Team" }],
  creator: "LMS Team",
  publisher: "LMS Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "/",
    title: "LMS - Private Tutoring & Support Lessons Management System",
    description:
      "A modern, scalable Learning Management System for private tutoring with support for multiple roles, bilingual functionality, and comprehensive course management.",
    siteName: "LMS",
  },
  twitter: {
    card: "summary_large_image",
    title: "LMS - Private Tutoring & Support Lessons Management System",
    description:
      "A modern, scalable Learning Management System for private tutoring with support for multiple roles, bilingual functionality, and comprehensive course management.",
    creator: "@lms",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "education",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
