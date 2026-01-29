import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  subsets: ["latin"],
  // or ["latin", "arabic"] if you need Arabic support
  weight: ["400", "700"],
  // choose the weights you want
});

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "A cloud hosting platform for your applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
