import { Metadata } from "next";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import FeaturesSection from "@/components/features-section";
import DestinationsSection from "@/components/destinations-section";
import ItinerariesSection from "@/components/trips-section";
import TestimonialsSection from "@/components/testimonials-section";
// ...existing code...
import ScrollOverlapSection from "@/components/scroll-overlap-section";

export const metadata: Metadata = {
  title: "AllTripp - Discover India's Hidden Gems | Premium Travel Experiences",
  description: "Explore incredible India with AllTripp's curated travel experiences. From Kashmir's snow-capped mountains to Kerala's backwaters, discover authentic cultural tours, adventure trips, and customized holiday packages across India.",
  keywords: [
    "India travel packages",
    "all trip",
    "alltrip",
    "adventure travel India",
    "holiday packages India",
    "Kashmir tours",
    "Kerala backwaters",
    "Rajasthan travel",
    "Himachal Pradesh",
    "Goa packages",
    "Northeast India",
    "travel experiences",
    "authentic India tours"
  ],
  openGraph: {
    title: "AllTripp - Discover India's Hidden Gems",
    description: "Explore incredible India with AllTripp's curated travel experiences. Authentic cultural tours, adventure trips, and customized holiday packages.",
    url: "https://alltripp.com",
    images: [
      {
        url: "/himalayas.jpg",
        width: 1200,
        height: 630,
        alt: "Beautiful Indian Himalayas - AllTripp Travel",
      },
    ],
  },
  twitter: {
    title: "AllTripp - Discover India's Hidden Gems",
    description: "Explore incredible India with AllTripp's curated travel experiences. Authentic cultural tours and adventure trips.",
    images: ["/himalayas.jpg"],
  },
  alternates: {
    canonical: 'https://alltripp.com',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <ItinerariesSection />
      <TestimonialsSection />
      <ScrollOverlapSection />
    </>
  );
}
