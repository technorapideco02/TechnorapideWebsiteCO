import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollObserver from "./components/ScrollObserver";
import NextTopLoader from 'nextjs-toploader';
import ContactWidget from "./components/ContactWidget";
import JsonLd from "./components/JsonLd";


export const metadata: Metadata = {
  metadataBase: new URL('https://technorapide.com'),
  title: {
    default: "Best Website Development Company in Barasat | Kolkata | India | Technorapide",
    template: "%s | Technorapide - Best Web Dev Company"
  },
  description: "Technorapide is the Best Website Development Company in Barasat, Kolkata, and India. We provide expert web development, software solutions, and IT apps for businesses worldwide.",
  keywords: [
    "Best Website Development Company in Barasat",
    "Best Website Development Company in Kolkata",
    "Best Website Development Company in India",
    "Web Development",
    "Software Development",
    "Dev",
    "Technique",
    "Tech",
    "IT App",
    "Web",
    "Business",
    "Company",
    "LSI Keywords",
    "Software Solutions",
    "Digital Innovation",
    "AI Automation",
    "Enterprise Architecture",
    "Technorapide"
  ],
  openGraph: {
    title: "Best Website Development Company in Barasat | Kolkata | India | Technorapide",
    description: "Looking for the best web development company? Technorapide offers world-class software, web, and IT app solutions in Barasat, Kolkata, and India.",
    url: 'https://technorapide.com',
    siteName: 'Best Website Development Company in Barasat | Kolkata | India | Technorapide',
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
    title: 'Best Website Development Company in Barasat | Kolkata | India | Technorapide',
    description: 'Expert web development, software, and IT app solutions. Top-rated company in Barasat, Kolkata, and India.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4L9JHESCTX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-4L9JHESCTX');
            `,
          }}
        />
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
        <JsonLd />
        {children}
        <Footer />
        <ContactWidget />
      </body>
    </html>
  );
}
