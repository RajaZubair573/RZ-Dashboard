import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "R-Dashboard",
  description: "R-Dashboard - Your personal dashboard",
  icons: {
    icon: '/window.svg',
    shortcut: '/window.svg',
    apple: '/window.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaCode.className}>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
