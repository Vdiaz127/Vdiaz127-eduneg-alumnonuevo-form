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
  title: "Formulario Alumno Nuevo",
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
        
        className={`flex ${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Menu className={""}></Menu>
        <main className="flex-1 ml-0 lg:ml-64">{children}</main>
      </body>
    </html>
  );
}
