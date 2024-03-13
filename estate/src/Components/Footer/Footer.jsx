import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              <span className="text-2xl font-bold tracking-wide text-gray-100 uppercase">
                Websites Online Vinhomes
              </span>
            </a>
            <p className="mt-6 max-w-md text-gray-500">
              Vinhomes Online được ra đời và phát triển với mong muốn mang đến một dịch vụ đẳng cấp, thuận tiện và tiết kiệm hơn cho Khách hàng khi mua BĐS. Tại Vinhomes Online, Quý khách có thể dễ dàng tìm kiếm BĐS phù hợp với nhu cầu.
            </p>
          </div>

          <div>
            <p className="text-lg font-bold text-gray-100 uppercase">
              Contacts
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="mr-1 font-medium">Phone:</span>
                <a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" className="transition-colors duration-300 hover:text-teal-300">
                  1900 2323 89
                </a>
              </li>
              <li>
                <span className="mr-1 font-medium">Email:</span>
                <a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" className="transition-colors duration-300 hover:text-teal-300">
                  info@vinhomes.vn
                </a>
              </li>
              <li>
                <span className="mr-1 font-medium">Address:</span>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="transition-colors duration-300 hover:text-teal-300">
                  Long Biên, Hà Nội, Việt Nam
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-bold text-gray-100 uppercase">
              Social
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://www.youtube.com/vinhomes" className="transition-colors duration-300 hover:text-teal-300">
                  Youtube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/vinhomes.jsc/" className="transition-colors duration-300 hover:text-teal-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/online.vinhomes.vn" className="transition-colors duration-300 hover:text-teal-300">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-500">
            © 2020 Vinhomes Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
