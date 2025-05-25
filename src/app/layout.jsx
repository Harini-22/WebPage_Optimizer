import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: {
    default: "Web Performance Optimizer - Analyze & Improve Website Speed",
    template: "%s | Web Performance Optimizer"
  },
  description: "Analyze your website's performance metrics, get detailed insights, and actionable recommendations to improve loading speed, user experience, and SEO rankings.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      }
    ],
    shortcut: "/favicon.svg",
  },
  keywords: ["web performance", "website optimization", "page speed", "SEO", "user experience", "web vitals"],
  authors: [{ name: "Web Performance Optimizer" }],
  themeColor: {
    light: "#ffffff",
    dark: "#0a0a0a"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 