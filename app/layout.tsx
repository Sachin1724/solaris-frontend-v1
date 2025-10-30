import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configure Poppins font with semi-bold weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // Regular and Semi-Bold
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Solaris Dashboard",
  description: "Live data from the Solaris ESP32 Logger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply font variable to the body */}
      <body className={`${poppins.variable} font-poppins`}>{children}</body>
    </html>
  );
}