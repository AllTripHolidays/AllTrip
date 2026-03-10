import type { Metadata } from "next";
import PlanTripSection from "@/components/plan-trip-section";

export const metadata: Metadata = {
  title: "Plan Your Trip | AllTripp",
  description:
    "Answer a quick questionnaire to receive curated itinerary recommendations and personalized trip planning from AllTripp.",
};

export default function PlanTripPage() {
  return <PlanTripSection />;
}
