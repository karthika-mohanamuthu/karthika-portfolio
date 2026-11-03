import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = "Karthika Mohanamuthu | .NET Developer & Azure Engineer";
const description =
  ".NET developer and Azure engineer at TCS, modernizing enterprise applications, migrating them to Azure and securing them for a Fortune 500 client. Open to relocation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://karthika-portfolio-seven-tan.vercel.app"),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Karthika Mohanamuthu" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#faf8ff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
