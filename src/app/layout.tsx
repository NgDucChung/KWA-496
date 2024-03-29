import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { Container } from "postcss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "First App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Container style={{ minHeight: 'calc(100vh - 106px)' }}> */}
        {/* <header>Chung KIMEI</header> */}
        {children}
        {/* </Container> */}
        <footer className="bg-slate-400 text-center my-20">
            Nguyễn Đức Chung KIMEI GLOBAL & Goob Luck !!!
        </footer>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        </body>
    </html>
  );
}
