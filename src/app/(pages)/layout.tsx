'use client'
import "../../app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "BookShelf.com",
//   description: "Created by Nasim",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <>
    <Header />
      <main>{ children }</main>
    <Footer />
    </>

  );
}
