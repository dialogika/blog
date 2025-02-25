/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./styles/globals.css";

// Global metadata
export const metadata: Metadata = {
  title: "Dialogika Blog - Kursus Public Speaking",
  description:
    "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.",
  keywords: "Blog Dialogika, Blog, blog, dialogika",
  authors: [{ name: "Dialogika Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Dialogika Blog - Kursus Public Speaking",
    description:
      "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.",
    url: "https://www.dialogika.co/blog/",
    siteName: "Dialogika | Kelas Public Speaking",
    images: [{ url: "https://www.dialogika.co/assets/img/logo.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dialogika_co",
    title: "Dialogika Blog - Kursus Public Speaking",
    description:
      "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.",
    images: ["https://www.dialogika.co/assets/img/logo.webp"],
  },
  icons: {
    icon: `/blog/assets/img/favicon.webp`,
    apple: `/blog/assets/img/apple-touch-icon.webp`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <main className="main mb-4">{children}</main>
      </body>
    </html>
  );
}
