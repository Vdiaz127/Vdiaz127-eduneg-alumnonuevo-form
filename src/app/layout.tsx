import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from './components/Sidebar/Menu/Menu';
import { Provider } from "@/components/ui/provider";
import { Theme } from "@chakra-ui/react";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white">
          <Provider>
            {/* <Menu className={"h-full"}></Menu> */}
            <Theme appearance="light" >
              <main className="flex-1 h-full ml-0 lg:ml-64">
                {children} 
              </main>
            </Theme>
          </Provider>
      </body>
    </html>
  );
}
