import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollObserver from "./components/ScrollObserver";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "Technorapide | Digital Innovation & Solutions",
  description: "Technorapide provides cutting-edge digital solutions for startups and enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Outfit:wght@100..900&family=Playwrite+BR:wght@100..400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextTopLoader 
          color="var(--primary)" 
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={3} 
          crawl={true} 
          showSpinner={false} 
          easing="ease" 
          speed={200} 
          shadow="0 0 10px var(--primary),0 0 5px var(--primary)" 
        />
        <ScrollObserver />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
