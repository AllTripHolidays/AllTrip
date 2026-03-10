"use client";

import dynamic from 'next/dynamic';

// Lazy load heavy components with proper Next.js 15 compatibility

export const LazyDestinationsSection = dynamic(() => import('@/components/destinations-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

export const LazyTripsSection = dynamic(() => import('@/components/trips-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

export const LazyTestimonialsSection = dynamic(() => import('@/components/testimonials-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

export const LazyBlogSection = dynamic(() => import('@/components/blog-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});



export const LazyCampusAmbassadorSection = dynamic(() => import('@/components/campus-ambassador-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});
