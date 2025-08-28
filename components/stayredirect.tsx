import React from 'react';

const StayRedirect = () => {
  return (
    <section className="bg-background dark:bg-gray-900 py-16">
      <div className="container mx-auto px-7">
        <div
          className="relative bg-cover bg-center rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/placeholderstay.png')" }}
        >
          <div className="relative z-10 p-12 md:p-24 text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 max-w-xl">
              Nourish the mind, body, and spirit.
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-xl">
              Many people find that the combination of being in a peaceful
              natural setting and engaging in activities that nourish the
              mind, body, and spirit leave them feeling rejuvenated and
              refreshed.
            </p>
            <button className="bg-[#F5B963] text-black font-semibold py-3 px-10 rounded-md hover:bg-opacity-90 transition-colors">
              Find available stays
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayRedirect;
