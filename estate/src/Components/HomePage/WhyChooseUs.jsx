import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4">Why Choose Us</h2>
          <p className="font-light text-gray-600">We provide full service at every step.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Icon or SVG for "Trusted By Thousands" */}
            <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">Trusted By Thousands</h3>
            <p className="text-base text-gray-600 text-center">
              Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.
            </p>
          </div>

          {/* ... other cards ... */}   <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Icon or SVG for "Financing Made Easy" */}
            <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">Financing Made Easy</h3>
            <p className="text-base text-gray-600 text-center">
              Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Icon or SVG for "Financing Made Easy" */}
            <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">Financing Made Easy</h3>
            <p className="text-base text-gray-600 text-center">
              Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
