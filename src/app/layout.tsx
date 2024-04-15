import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courier = Courier_Prime({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "makigom.art",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌸</text></svg>"
      ></link>
      <body className={courier.className}>{children}</body>
    </html>
  );
}
