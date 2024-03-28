import React from "react";
import { FaPhone, FaEnvelope, FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa';

export const AboutUs = () => {
    return (
        <div className="bg-gray-50 text-gray-800 p-10 font-serif">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-extrabold text-gray-900">Vinhomes Online</h2>
                        <p className="text-lg text-gray-700">
                            Vinhomes Online was founded and developed with the desire to provide a premium, convenient, and cost-effective service for customers when purchasing real estate. At Vinhomes Online, customers can easily find real estate properties that meet their needs. With the criteria of Accuracy, Transparency, Diversity, Savings, and Full Offers, we always provide customers with timely, clear, and complete information and sales policies, along with safe and convenient payment methods. Now, customers can buy real estate anywhere, anytime, with just a few clicks on a computer or mobile phone. Let's experience a completely new digital platform together!
                        </p>
                        <p className="text-lg font-semibold">ONLINE SALES CENTER</p>
                        <p className="text-md">&copy; 2023 Vinhomes Online. All rights reserved.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <FaPhone className="w-6 h-6 mr-4 text-blue-600" />
                            <div>
                                <span className="text-lg font-semibold">Hotline - 1900 2323 89</span>
                                <p className="text-md">(24/7)</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="w-6 h-6 mr-4 text-red-600" />
                            <span className="text-lg">info@vinhomes.vn</span>
                        </div>
                        <div className="flex items-center">
                            <FaYoutube className="w-6 h-6 mr-4 text-red-600" />
                            <span className="text-lg">Vinhomes Channel</span>
                        </div>
                        <div className="flex items-center">
                            <FaInstagram className="w-6 h-6 mr-4 text-pink-600" />
                            <span className="text-lg">@vinhomes</span>
                        </div>
                        <div className="flex items-center">
                            <FaFacebookF className="w-6 h-6 mr-4 text-blue-600" />
                            <span className="text-lg">Vinhomes Facebook</span>
                        </div>
                    </div>
                </div>

                {/* Additional information */}
                <div className="mt-12 space-y-8">
                    <h3 className="text-3xl font-bold text-gray-900">Since the 1980s</h3>
                    <p className="text-lg text-gray-700">
                        Vin Group Real Estate Company started from a small office in the center of Ho Chi Minh City with the goal of becoming the leading real estate provider in Vietnam. Initially, the company had only a few employees, but with the visionary leadership of the founder - Mr. Nguyen Vin Group, the company gradually built reputation and strong development.
                    </p>
                    <p className="text-lg text-gray-700">
                        Throughout over 40 years of operation, Vin Group has continuously expanded its scale and improved service quality. To date, Vin Group is not only the name behind a series of luxury apartment projects, luxurious villas but also a reliable partner of many major real estate investors inside and outside the country.
                    </p>
                    {/* Outstanding Projects */}
                    <div className="space-y-6">
                        <p className="text-xl font-semibold">Outstanding Projects:</p>
                        <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                            <li>
                                <strong>Thanh Dat Riverside Urban Area</strong>: Providing a green, fresh living space for residents with premium amenities.
                                <div className="mt-2">
                                    <img src="https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2023_07/gDEHQfH0_1689751750.jpeg?itok=R6lbOml4" alt="Thanh Dat Riverside" className="rounded-lg shadow-md" />
                                </div>
                            </li>
                            <li>
                                <strong>Thanh Dat Tower</strong>: The new symbol of prosperity in the city center.
                                <div className="mt-2">
                                    <img src="https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2021_02/Secton 1 (Headbanner)_2.jpg?itok=317k4AVs" alt="Thanh Dat Tower" className="rounded-lg shadow-md" />
                                </div>
                            </li>
                            <li>
                                <strong>Thanh Dat Hill Ecological Villa</strong>: The perfect combination of nature and architecture.
                                <div className="mt-2">
                                    <img src="https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2023_04/PC02_OP3 The Crown_Tổng thể công viên hướng BBQ_1681119684.jpg?itok=vExYeqVS" alt="Thanh Dat Hill" className="rounded-lg shadow-md" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p className="text-lg text-gray-700">
                        With an experienced team of experts, advanced technology, and a focus on service quality, Vin Group is proud to be the top choice for customers and investors when seeking the best real estate solutions.
                    </p>
                    <p className="text-lg text-gray-700">
                        In the future, Vin Group continues to aim for international expansion, bringing Vietnamese brand and services to the world, while constantly improving the quality of life for the community.
                    </p>
                </div>
            </div>
        </div>
    );
};
