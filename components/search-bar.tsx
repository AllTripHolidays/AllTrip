"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Calendar as CalendarIcon, Search, User, MapPin } from "lucide-react";
import destinationsDataRaw from "@/data/destinations.json";
import itinerariesDataRaw from "@/data/itineraries.json";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

// We'll import the new reusable hook instead of defining a function here
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selection, setSelection] = useState<{ type: 'dest' | 'itin'; value: string } | null>(null);
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(1);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // New: Use the custom hook to get the debounced value.
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const destinationsData = Array.from(new Map(destinationsDataRaw.map((d) => [d.name, d])).values());
  const itinerariesData = Array.from(new Map(itinerariesDataRaw.map((i) => [i.title, i])).values());

  // Use the debounced value for filtering
  const filteredDestinations = debouncedSearchTerm
    ? destinationsData.filter((d) => d.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : destinationsData;

  const filteredItineraries = debouncedSearchTerm
    ? itinerariesData.filter((i) => i.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : itinerariesData;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selection) return;

    // A single, reusable slug generation logic for both destinations and itineraries
    const slug = encodeURIComponent(selection.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));

    if (selection.type === 'itin') {
      router.push(`/itineraries/${slug}`);
    } else {
      router.push(`/destinations/${slug}`);
    }
  };

  const handleFieldActivation = (field: string | null) => {
    setActiveField(field);
    if (field) {
      setIsOverlayActive(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClose = () => {
    setActiveField(null);
    setIsOverlayActive(false);
    document.body.style.overflow = 'auto';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOverlayActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
      <div ref={searchBarRef} className={`relative w-full z-50 transition-transform duration-300 ease-in-out ${isOverlayActive ? '-translate-y-64' : ''}`}>
        <motion.div
          layout
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex items-center transition-all duration-300 ease-in-out p-4 border ${activeField ? 'ring-2 ring-[#FDBE00]' : 'border-transparent dark:border-gray-600'}`}
        >
          {/* Destination/Itinerary Search */}
          <div className="flex-1 group" onClick={() => handleFieldActivation('location')}>
            <div className="flex items-center pl-4 pr-2 cursor-pointer">
              <MapPin className="h-6 w-6 text-[#FDBE00] mr-3" />
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
                <div className="text-base text-gray-600 dark:text-gray-400 truncate">
                  {selection ? selection.value : "Where are you going?"}
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200 dark:bg-gray-600" />

          {/* Date Picker */}
          <Popover onOpenChange={(open) => handleFieldActivation(open ? 'dates' : null)}>
            <PopoverTrigger asChild>
              <div className="flex-1 group">
                <div className="flex items-center px-4 cursor-pointer">
                  <CalendarIcon className="h-6 w-6 text-[#FDBE00] mr-3" />
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dates</label>
                    <div className="text-base text-gray-600 dark:text-gray-400">
                      {date.from && date.to ? `${format(date.from, "LLL dd")} - ${format(date.to, "LLL dd")}` : "Add dates"}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={(range) => setDate({ from: range?.from, to: range?.to })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <div className="h-10 w-px bg-gray-200 dark:bg-gray-600" />

          {/* Guests */}
          <Popover onOpenChange={(open) => handleFieldActivation(open ? 'guests' : null)}>
            <PopoverTrigger asChild>
              <div className="flex-1 group">
                <div className="flex items-center px-4 cursor-pointer">
                  <User className="h-6 w-6 text-[#FDBE00] mr-3" />
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Guests</label>
                    <div className="text-base text-gray-600 dark:text-gray-400">{guests} guest{guests > 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600" align="end">
              <div className="flex items-center justify-between text-black dark:text-white">
                <span className="font-semibold">Guests</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>
                  <span>{guests}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setGuests(guests + 1)}>+</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <motion.button
            layout
            onClick={handleSearch}
            className="bg-[#FDBE00] text-black rounded-md p-3 hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Location Search Dropdown */}
        <AnimatePresence>
          {activeField === 'location' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-600 p-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations or itineraries"
                  value={searchTerm}
                  // *** THE CRITICAL CHANGE IS HERE ***
                  style={{ color: theme === 'dark' ? 'white' : 'black' }} 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDBE00] outline-none bg-white dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto mt-4 custom-scrollbar">
                {/* Itineraries */}
                <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pt-2">Itineraries</h3>
                {filteredItineraries.length > 0 ? (
                  filteredItineraries.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelection({ type: 'itin', value: item.title });
                        handleFieldActivation(null);
                      }}
                    >
                      <div className="bg-emerald-100 text-emerald-700 rounded-lg p-2">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-black dark:text-white">{item.title}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 p-2">No itineraries found.</p>
                )}

                {/* Destinations */}
                <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pt-4">Destinations</h3>
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelection({ type: 'dest', value: item.name });
                        handleFieldActivation(null);
                      }}
                    >
                      <div className="bg-blue-100 text-blue-700 rounded-lg p-2">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-black dark:text-white">{item.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 p-2">No destinations found.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
