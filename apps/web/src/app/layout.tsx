import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransmissionsForSale | Best Prices on Used Transmissions",
  description: "Find high-quality used transmissions at the best prices. Save up to 50% off dealer prices with fast shipping and a 30-day warranty.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
