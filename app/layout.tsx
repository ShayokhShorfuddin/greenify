import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We don't want to include the ReactScan component in production builds. It's just for local development */}
      {process.env.NODE_ENV === "development" && (
        <head>
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        </head>
      )}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* min-h-svh in order to push footer to bottom on tall screens */}
        <div className="min-h-svh">
          <Navbar />
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
