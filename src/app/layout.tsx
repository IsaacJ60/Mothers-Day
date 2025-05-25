"use client"; // Required for useState

import { DM_Sans, /*DM_Mono*/ } from "next/font/google";
import ParticlesBackground from '@/components/ParticlesBackground';
import HelpPopup from '@/components/HelpPopup'; // Import HelpPopup
import { useState } from 'react'; // Import useState
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

// Cannot add metadata in 'use client' component
// export const metadata: Metadata = {
//   title: "Mother's Day",
//   description: "To the best mom in the world... Happy Mother's Day!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showHelpPopup, setShowHelpPopup] = useState(false); // State for popup visibility

  return (
    <html lang="en">
      <body
        className={`${DMSans.className} antialiased`}
      >
        {children}
        <ParticlesBackground />

        {/* Help Button */}
        <button
          onClick={() => setShowHelpPopup(true)}
          className="fixed bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 z-40"
          aria-label="Open help popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
        </button>

        {/* Help Popup */}
        {showHelpPopup && (
          <HelpPopup onClose={() => setShowHelpPopup(false)} />
        )}
      </body>
    </html>
  );
}
