import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollObserver from "./components/ScrollObserver";
import NextTopLoader from 'nextjs-toploader';
import ContactWidget from "./components/ContactWidget";

export const metadata: Metadata = {
  metadataBase: new URL('https://technorapide.com'),
  title: {
    default: "Technorapide | Digital Innovation & Solutions",
    template: "%s | Technorapide"
  },
  description: "Technorapide provides cutting-edge digital solutions for startups and enterprises globally. Specialized in AI, Cloud, and Custom Software.",
  keywords: ["Digital Innovation", "Software Solutions", "AI Automation", "Enterprise Architecture", "Technorapide"],
  openGraph: {
    title: "Technorapide | Digital Innovation & Solutions",
    description: "Empowering startups and enterprises with cutting-edge technology.",
    url: 'https://technorapide.com',
    siteName: 'Technorapide',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technorapide | Digital Innovation & Solutions',
    description: 'Empowering startups and enterprises with cutting-edge technology.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Outfit:wght@100..900&family=Playwrite+BR:wght@100..400&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
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
          shadow={false}
        />
        <ScrollObserver />
        <Navbar />
        {children}
        <Footer />
        <ContactWidget />
      </body>
    </html>
  );
}
