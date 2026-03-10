"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { trackCta, trackEvent } from "@/lib/analytics";
import { SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [newsletterState, setNewsletterState] = React.useState<"idle" | "pending" | "success" | "error">("idle");

  // Keep `aria-invalid` valid in markup and update at runtime for screen readers.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.getElementById("footer-email");
    if (el) el.setAttribute("aria-invalid", newsletterState === "error" ? "true" : "false");
  }, [newsletterState]);

  return (
    <footer role="contentinfo" className="bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Branding */}
          <div className="md:col-span-3">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-extrabold mb-0 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">AllTripp</h3>
              <p className="text-gray-400 text-sm max-w-xs">Adventure • Community • Experiences — curated trips and meaningful travel.</p>

              <div className="flex items-center gap-3 mt-3" role="group" aria-label="Social media links">
                <motion.a
                  href="https://www.instagram.com/alltripp_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/people/AllTripp/61569322995221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/alltripp/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="h-5 w-5" />
                </motion.a>
              </div>

              <div className="mt-4">
                <a
                  href="https://wa.me/919266602470?text=Hi%20AllTripp%2C%20I%20am%20interested%20in%20planning%20a%20trip.%20Can%20you%20help%20me%20with%20the%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta('whatsapp_book_trip', 'footer')}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-5 rounded-md shadow-sm transition-all duration-200"
                >
                  <IconBrandWhatsapp className="h-5 w-5" />
                  Book Your Trip
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation" className="md:col-span-2">
            <h4 className="text-sm font-semibold text-gray-200 mb-3">Quick Links</h4>
            <div className="relative">
              {/* Vertical divider between the two columns on md+; has top/bottom gaps and stronger contrast */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-[2px] bg-gray-300/40 dark:bg-white/20 z-0 rounded"
              />
              <ul className="relative z-10 grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-300">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="#about" className="hover:text-white">About</Link></li>
                <li><Link href="#destinations" className="hover:text-white">Destinations</Link></li>
                <li><Link href="#trips" className="hover:text-white">Trips</Link></li>
                <li><Link href="/campus" className="hover:text-white">Campus Ambassador</Link></li>
                <li><Link href="/policies" className="hover:text-white">Policies</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-gray-200 mb-3">Contact</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:alltrippofficial@gmail.com" className="hover:text-white">alltrippofficial@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:+919266602470" className="hover:text-white">+91 9266602470</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-gray-200 mb-2">Subscribe to our Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Get travel updates, exclusive offers and inspiration.</p>

              <form className="relative flex items-center gap-3" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;
                const email = emailInput?.value || "";
                trackEvent('newsletter_subscribe_attempt', { emailPresent: !!email });

                if (!email) { setNewsletterState("error"); return; }
                setNewsletterState("pending");

                try {
                  const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    setNewsletterState("success");
                    trackEvent('newsletter_subscribe_success', { emailPresent: !!email });
                    if (emailInput) emailInput.value = "";
                    setTimeout(() => setNewsletterState("idle"), 4000);
                  } else {
                    throw new Error(data.error || 'Failed to subscribe');
                  }
                } catch (error) {
                  setNewsletterState("error");
                  trackEvent('newsletter_subscribe_error', { error: error instanceof Error ? error.message : 'Unknown error' });
                  setTimeout(() => setNewsletterState("idle"), 4000);
                }
              }}>
                <Mail className="absolute left-3 text-gray-400 h-4 w-4" />
                <input id="footer-email" name="email" type="email" required placeholder="Your email address" className="pl-10 pr-4 py-2 rounded-md bg-gray-900 text-gray-100 w-full" aria-required="true" aria-invalid="false" />
                <button type="submit" className="ml-2 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-4 py-2 rounded-md" disabled={newsletterState === "pending"}>{newsletterState === "pending" ? "Subscribing..." : "Subscribe"}</button>
              </form>
              <div aria-live="polite" className="min-h-[1.25rem] mt-3">
                {newsletterState === "success" && (<p className="text-sm text-green-400">Thanks — check your inbox.</p>)}
                {newsletterState === "error" && (<p className="text-sm text-yellow-300">Please enter a valid email address.</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AllTripp. All rights reserved.</p>
      </div>
    </footer>
  );
}
