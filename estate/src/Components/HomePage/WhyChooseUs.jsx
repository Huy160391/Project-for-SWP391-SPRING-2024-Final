import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 relative bg-amber-100 bg-opacity-50 ">
      {/* Màu nền mờ */}
      <div className=" inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="container text-4xl mt-12 font-serif items-center text-blue-900 text-b font-serif text-center" style={{ zIndex: 1 }}>Why Choose Us</h2>
          <div className="absolute text-center mb-16 relative z-10 opacity-70">
            <h2 className="text-9xl text-amber-100 text-opacity-90 font-serif mb-4">VINHOMES</h2>
          </div>
        </div>
      </div>



      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="flex flex-col items-center p-6 border-1 border-blue-900 rounded-lg shadow-md">
            {/* Icon or SVG for "Trusted By Thousands" */}
            <h3 className="mt-8 mb-4 text-xl font-serif text-blue-900">Trusted By Thousands</h3>
            <p className="font-serif text-blue-900 text-center">
              Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.
            </p>
          </div>

          {/* ... other cards ... */}
          <div className="flex flex-col items-center p-6 border-1 border-blue-900 rounded-lg shadow-md">
            {/* Icon or SVG for "Financing Made Easy" */}
            <h3 className="mt-8 mb-4 text-xl font-serif text-blue-900">Financing Made Easy</h3>
            <p className="font-serif text-blue-900 text-center">
              Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 border-1 border-blue-900 rounded-lg shadow-md">
            {/* Icon or SVG for "Financing Made Easy" */}
            <h3 className="mt-8 mb-4 text-xl font-serif text-blue-900">Financing Made Easy</h3>
            <p className="font-serif text-blue-900 text-center">
              Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
