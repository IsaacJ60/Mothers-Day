import type { Metadata } from "next";
import { DM_Sans, /*DM_Mono*/ } from "next/font/google";
import ParticlesBackground from '@/components/ParticlesBackground';
import "./globals.css";

const DMSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});

// const DMMono = DM_Mono({
//   variable: "--font-dmmono",
//   subsets: ["latin"],
//   weight: "300"
// });

export const metadata: Metadata = {
  title: "Mother's Day",
  description: "To the best mom in the world... Happy Mother's Day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DMSans.className} antialiased`}
      >
        {children}
        <ParticlesBackground></ParticlesBackground>
      </body>
    </html>
  );
}
