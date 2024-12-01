import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from './components/Sidebar/Menu/Menu';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Form - new student",
  description: "formulario para agregar alumno nuevo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{display: "flex", height: "100vh"}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Menu></Menu>
        {children}
      </body>
    </html>
  );
}
