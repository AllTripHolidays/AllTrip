"use client"

import React from "react"
import HeroShowcase from "@/components/hero-showcase"
import SocialImpactSection from "@/components/social-impact-section"
import BookDetailsSection from "@/components/book-details-section"
import ScrollOverlapSection from "@/components/scroll-overlap-section"

// lazy-load the larger landing sections so the initial bundle is smaller
import {
  LazyDestinationsSection,
  LazyTripsSection,
  LazyTestimonialsSection,
  LazyBlogSection,
} from "@/components/lazy-components";

export default function HomeClient() {
  return (
    <>
      <HeroShowcase />
      {/* load the heavier sections lazily so they don't contribute to the first bundle */}
      <LazyDestinationsSection />
      <SocialImpactSection />
      <LazyTripsSection />
      <BookDetailsSection />
      <LazyTestimonialsSection />
      <ScrollOverlapSection />
    </>
  )
}
