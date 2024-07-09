import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Case",
  description: "Custom Phone Case Creator - Design and purchase personalized phone cases with ease. Developed using Next.js, TypeScript, React-Hook-Form, ShadCN-UI, and Stripe for a seamless, secure, and scalable user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />
        <main className="flex flex-col grainy-light min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex-col flex h-full">
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
