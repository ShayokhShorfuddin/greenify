import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        {/* We don't want to include the ReactScan component in production builds. It's just for local development */}
        {process.env.NODE_ENV === "development" && (
          <head>
            <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
          </head>
        )}

        <body
          id="root-body"
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* min-h-svh in order to push footer to bottom on tall screens */}
          <div className="min-h-svh">{children}</div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
