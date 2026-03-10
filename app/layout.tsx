import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Montserrat, Poppins } from "next/font/google"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import { Analytics } from "@vercel/analytics/react"
import ClientPerformance from "@/components/client-performance"
import LenisProvider from "@/components/lenis-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["600","700"], display: 'swap' })
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400","500","600","700"], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: "AllTripp - One Solution For All Your Travel Needs",
    template: "%s | AllTripp"
  },
  description: "Discover India's hidden gems with AllTripp - your premium travel partner. From Kashmir to Kerala, Rajasthan to Northeast, explore authentic experiences, cultural tours, adventure trips, and customized packages across incredible India.",
  keywords: [
    "travel agency India",
    "India tour packages",
    "travel experiences India",
    "cultural tours India",
    "adventure travel India",
    "Kashmir tours",
    "Kerala backwaters",
    "Rajasthan travel",
    "Himachal Pradesh trips",
    "Northeast India tours",
    "Goa packages",
    "Delhi tours",
    "travel booking India",
    "holiday packages India",
    "travel company India"
  ],
  authors: [{ name: "AllTripp Travel" }],
  creator: "AllTripp",
  publisher: "AllTripp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },  metadataBase: new URL('https://alltripp.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://alltripp.com",
    title: "AllTripp - Premium Travel Experiences Across India",
    description: "Discover India's hidden gems with AllTripp. Authentic travel experiences, cultural tours, and adventure trips across incredible India.",
    siteName: "AllTripp",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AllTripp - Travel Agency India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllTripp - Premium Travel Experiences Across India",
    description: "Discover India's hidden gems with AllTripp. Authentic travel experiences, cultural tours, and adventure trips.",
    images: ["/logo.png"],
    creator: "@AllTripp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
<body className={`${inter.variable} ${montserrat.variable} ${poppins.variable} font-sans antialiased m-0 p-0 bg-white dark:bg-[hsl(var(--surface-base))] text-[hsl(var(--foreground))] tracking-[0.015em] selection:bg-[hsl(var(--brand-accent))]/25`}>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="skip-link fixed left-2 top-2 -translate-y-20 focus:translate-y-0 focus:outline-none bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground))] px-4 py-2 rounded shadow transition-transform z-[9999]"
        >
          Skip to content
        </a>
        {/* Reduced motion preference detection (adds class to <body>) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduced-motion')}}catch(e){}`
          }}
        />
        <SpeedInsights />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LenisProvider>
            <Navbar />
            {/* Main content without top padding since navbar is not fixed */}
            <main id="main-content" role="main" className="m-0 p-0">{children}</main>
            <Footer />
            <Chatbot />
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
        <ClientPerformance />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "AllTripp",
              "description": "Premium travel experiences across India",
              "url": "https://alltripp.com",
              "logo": "https://alltripp.com/logo.png",
              "sameAs": [
                "https://facebook.com/alltripp",
                "https://instagram.com/alltripp",
                "https://twitter.com/alltripp"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "serviceType": [
                "Travel Planning",
                "Tour Packages",
                "Cultural Tours",
                "Adventure Travel",
                "Holiday Packages"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
