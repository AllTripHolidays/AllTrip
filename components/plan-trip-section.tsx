"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const vibeOptions = [
  {
    label: "Mountain Retreat",
    description: "Alpine air, lakes, quiet trails",
  },
  {
    label: "Desert Adventure",
    description: "Dunes, stargazing, bold landscapes",
  },
  {
    label: "Island Escape",
    description: "Blue waters, slow mornings, sunsets",
  },
  {
    label: "Cultural Immersion",
    description: "Festivals, rituals, local stories",
  },
  {
    label: "Remote and offbeat",
    description: "Rare places, low crowds, wild nature",
  },
];

const destinationOptions: Record<string, string[]> = {
  "Mountain Retreat": ["Switzerland", "Canada", "Nepal", "Austria", "Peru"],
  "Desert Adventure": ["Morocco", "UAE", "Australia", "Jordan", "Mexico"],
  "Island Escape": ["Maldives", "Greece", "Thailand", "Indonesia", "Fiji"],
  "Cultural Immersion": ["India", "Japan", "Italy", "Mexico", "Peru"],
  "Remote and offbeat": [
    "Greenland (Ittoqqortoormiit)",
    "Indonesia (Maluku Islands)",
    "Uzbekistan (Karakalpakstan)",
  ],
};

const recommendationMap: Record<string, { title: string; detail: string; days: string }[]> = {
  "Mountain Retreat": [
    { title: "Alpine Lakes & Peaks", detail: "Lucerne • Interlaken • Jungfrau", days: "7-9 days" },
    { title: "Snowline Trails", detail: "Zermatt • Matterhorn • Gornergrat", days: "6-8 days" },
    { title: "Himalayan Calm", detail: "Pokhara • Annapurna • Ghandruk", days: "8-10 days" },
  ],
  "Desert Adventure": [
    { title: "Sahara Nights", detail: "Marrakesh • Merzouga • Fes", days: "6-8 days" },
    { title: "Wadi Wonders", detail: "Amman • Petra • Wadi Rum", days: "5-7 days" },
    { title: "Red Sands Escape", detail: "Dubai • Liwa • Al Ain", days: "4-6 days" },
  ],
  "Island Escape": [
    { title: "Lagoon Luxe", detail: "Malé • Baa Atoll • Hanifaru", days: "5-7 days" },
    { title: "Aegean Glow", detail: "Santorini • Naxos • Paros", days: "7-9 days" },
    { title: "Tropical Trio", detail: "Phuket • Krabi • Phi Phi", days: "6-8 days" },
  ],
  "Cultural Immersion": [
    { title: "Heritage Walks", detail: "Kyoto • Nara • Osaka", days: "6-8 days" },
    { title: "Festive Routes", detail: "Jaipur • Varanasi • Delhi", days: "7-9 days" },
    { title: "Timeless Italy", detail: "Rome • Florence • Siena", days: "7-10 days" },
  ],
  "Remote and offbeat": [
    { title: "Arctic Edge", detail: "Tasiilaq • Sermilik • Ittoqqortoormiit", days: "8-11 days" },
    { title: "Hidden Archipelago", detail: "Ambon • Banda • Kei", days: "7-10 days" },
    { title: "Silk Road Quiet", detail: "Nukus • Muynak • Khiva", days: "6-8 days" },
  ],
};

const currencyOptions = ["USD", "EUR", "GBP", "INR", "AED", "AUD", "CAD", "CHF", "JPY"];

export default function PlanTripSection() {
  const [stepIndex, setStepIndex] = useState(0);
  const [vibe, setVibe] = useState("");
  const [destination, setDestination] = useState("");
  const [customDestination, setCustomDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("USD");
  const [accommodation, setAccommodation] = useState("");
  const [mustDo, setMustDo] = useState("");
  const [transport, setTransport] = useState("");
  const [notes, setNotes] = useState("");

  const tripLength = useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return null;
    }
    const diff = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    return diff > 0 ? diff : null;
  }, [startDate, endDate]);

  const selectedDestination = customDestination.trim() || destination;

  const steps = [
    { id: "intro", title: "Welcome" },
    { id: "vibe", title: "Trip Vibe" },
    { id: "destination", title: "Preferred Destinations" },
    { id: "dates", title: "Travel Dates" },
    { id: "travelers", title: "Travelers" },
    { id: "budget", title: "Budget" },
    { id: "accommodation", title: "Accommodation" },
    { id: "mustdo", title: "Must-do Activity" },
    { id: "transport", title: "Getting Around" },
    { id: "notes", title: "Anything Else" },
    { id: "recommendations", title: "Recommendations" },
  ];

  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;

  const isNextDisabled = useMemo(() => {
    switch (steps[stepIndex]?.id) {
      case "vibe":
        return !vibe;
      case "destination":
        return !selectedDestination;
      case "dates":
        return !startDate || !endDate || !tripLength;
      case "travelers":
        return !travelers;
      case "budget":
        return !budgetAmount || !budgetCurrency;
      default:
        return false;
    }
  }, [stepIndex, steps, vibe, selectedDestination, startDate, endDate, tripLength, travelers, budgetAmount, budgetCurrency]);

  const goNext = () => {
    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (!isFirstStep) {
      setStepIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      id="plan-trip"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50"
    >
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <div className="section-shell section-spacing relative">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Personalized Planning
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-4 w-4" />
              {tripLength ? `${tripLength} days selected` : "Trip length"}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Step {stepIndex + 1} of {steps.length}</p>
                <p className="text-lg font-semibold text-slate-900">{steps[stepIndex]?.title}</p>
              </div>
              <div className="text-xs text-slate-500">{stepIndex + 1}/{steps.length}</div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setStepIndex(index)}
                  aria-label={`Go to step ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    stepIndex === index
                      ? "bg-slate-900"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <div key={steps[stepIndex]?.id} className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {steps[stepIndex]?.id === "intro" && (
                  <div className="space-y-4">
                    <h2 className="heading-display !text-[#0F172A]">
                      Plan your next trip with AllTripp
                    </h2>
                    <p className="text-base text-slate-600">
                      Hi there! I&apos;m AllTripp. Share your vibe, budget, and dates, and we&apos;ll craft itinerary ideas just for you.
                      Start with a few quick questions, then unlock tailored recommendations with WhatsApp support when you&apos;re ready to customize.
                    </p>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                      We&apos;ll take this one question at a time so everything stays easy and clear.
                    </div>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white"
                    >
                      Begin
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {steps[stepIndex]?.id === "vibe" && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">What vibe do you want on your next trip?</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {vibeOptions.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setVibe(option.label)}
                          className={`rounded-2xl border px-4 py-3 text-left transition ${
                            vibe === option.label
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <p className="text-sm font-semibold">{option.label}</p>
                          <p className="text-xs text-slate-500">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {steps[stepIndex]?.id === "destination" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      Based on your chosen vibe, which destinations would you prefer?
                    </p>
                    <div className="grid gap-2">
                      {(destinationOptions[vibe] || []).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setDestination(option)}
                          className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                            destination === option
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                      {!vibe && (
                        <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-500">
                          Select a vibe first to unlock destination suggestions.
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Destination you would like to select
                      </label>
                      <input
                        type="text"
                        value={customDestination}
                        onChange={(event) => setCustomDestination(event.target.value)}
                        placeholder="Type your own destination"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                      />
                    </div>
                  </div>
                )}

                {steps[stepIndex]?.id === "dates" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">How many days would you like to travel?</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-slate-500">Start date</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(event) => setStartDate(event.target.value)}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-slate-500">End date</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(event) => setEndDate(event.target.value)}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        />
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-500">
                      {tripLength
                        ? `Total trip length: ${tripLength} days (${Math.max(tripLength - 1, 0)} nights)`
                        : "Select both dates to calculate the trip length."}
                    </div>
                  </div>
                )}

                {steps[stepIndex]?.id === "travelers" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">No. of persons</p>
                    <input
                      type="number"
                      min={1}
                      value={travelers}
                      onChange={(event) => setTravelers(event.target.value)}
                      placeholder="How many travelers?"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {steps[stepIndex]?.id === "budget" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">What is your budget for this trip?</p>
                    <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                      <input
                        type="number"
                        min={0}
                        value={budgetAmount}
                        onChange={(event) => setBudgetAmount(event.target.value)}
                        placeholder="Budget amount"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                      />
                      <select
                        value={budgetCurrency}
                        onChange={(event) => setBudgetCurrency(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      >
                        {currencyOptions.map((currency) => (
                          <option key={currency} value={currency} className="text-slate-900">
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {steps[stepIndex]?.id === "accommodation" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">What type of accommodation do you prefer?</p>
                    <input
                      type="text"
                      value={accommodation}
                      onChange={(event) => setAccommodation(event.target.value)}
                      placeholder="Hotel, resort, Airbnb, boutique stay"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {steps[stepIndex]?.id === "mustdo" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">What is one activity you definitely don't want to miss?</p>
                    <input
                      type="text"
                      value={mustDo}
                      onChange={(event) => setMustDo(event.target.value)}
                      placeholder="Local food, hiking, museums, etc."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {steps[stepIndex]?.id === "transport" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">How do you prefer to get around?</p>
                    <input
                      type="text"
                      value={transport}
                      onChange={(event) => setTransport(event.target.value)}
                      placeholder="Rental car, public transport, private tours"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {steps[stepIndex]?.id === "notes" && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">Anything that you want from our side</p>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Add any special requests or notes"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {steps[stepIndex]?.id === "recommendations" && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">Thanks for sharing your details!</p>
                      <p className="text-xs text-slate-500">Here are the best-fit itineraries based on your answers.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm text-slate-700">Your preferences</p>
                      <div className="mt-3 grid gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Vibe: {vibe || "Not selected"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Destination: {selectedDestination || "Not selected"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>
                            Dates: {startDate && endDate ? `${startDate} to ${endDate}` : "Not selected"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>
                            Budget: {budgetAmount ? `${budgetAmount} ${budgetCurrency}` : "Not selected"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-slate-900">Recommended itineraries</p>
                      <div className="grid gap-3">
                        {(recommendationMap[vibe] || []).map((item) => (
                          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.detail}</p>
                            <p className="mt-2 text-xs text-emerald-500">{item.days}</p>
                          </div>
                        ))}
                        {!vibe && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
                            Select a vibe to unlock matching itineraries.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Link
                        href="/itineraries"
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
                      >
                        View all itineraries
                      </Link>
                      <a
                        href="https://wa.me/919266602470?text=Hi%20AllTripp%2C%20I%20want%20to%20customize%20my%20itinerary."
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Customize with WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {!isFirstStep && (
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  {!isLastStep && (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={isNextDisabled}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition ${
                        isNextDisabled
                          ? "bg-slate-200 text-slate-400"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
