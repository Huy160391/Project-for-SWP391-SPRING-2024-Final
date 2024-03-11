import React from "react";

const Footer = () => {
    return (
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <a
                        href="/"
                        aria-label="Go home"
                        title="Company"
                        className="inline-flex items-center"
                    >

                        <span className="ml-0 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            WEBSITES ONLINE VINHOMES
                        </span>
                    </a>
                    <div className="mt-3 lg:max-w-sm">
                        <p className="text-sm text-gray-800">
                            Vinhomes Online được ra đời và phát triển với mong muốn mang đến một dịch vụ đẳng cấp, thuận tiện và tiết kiệm hơn cho Khách hàng khi mua BĐS. Tại Vinhomes Online, Quý khách có thể dễ dàng tìm kiếm BĐS phù hợp với nhu cầu.
                        </p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Contacts
                    </p>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Phone:</p>
                        <a
                            href="tel:850-123-5021"
                            aria-label="Our phone"
                            title="Our phone"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            1900 2323 89
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Email:</p>
                        <a
                            href="mailto:info@lorem.mail"
                            aria-label="Our email"
                            title="Our email"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            info@vinhomes.vn
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Address:</p>
                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Our address"
                            title="Our address"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            Long Biên, Hà Nội, Việt Nam.
                        </a>
                    </div>
                </div>
                <div>
                    <span className="text-xl font-bold tracking-wide text-gray-800 uppercase ml-20">
                        Social
                    </span>
                    <div className="flex-col flex items-center mt-1 space-x-3 mr-12">
                        <a
                            href="https://www.youtube.com/vinhomes"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            Youtube
                        </a>
                        <a
                            href="https://www.instagram.com/vinhomes.jsc/"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.facebook.com/online.vinhomes.vn"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className="text-sm text-gray-600">
                    © Copyright 2020 Lorem Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
