import React from "react";
import { FaPhone, FaEnvelope, FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa';

export const AboutUs = () => {
    return (
        <div className="bg-gray-50 text-gray-800 p-10">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-extrabold text-gray-900">Vinhomes Online</h2>
                        <p className="text-lg text-gray-700">
                            Vinhomes Online được ra đời và phát triển với mong muốn mang đến một dịch vụ đẳng cấp, thuận tiện và
                            tiết kiệm hơn cho Khách hàng khi mua BĐS. Tại Vinhomes Online, Quý khách có thể dễ dàng tìm kiếm BĐS phù
                            hợp với nhu cầu. Với tiêu chí Chính Xác, Minh Bạch, Đa Dạng, Tiết Kiệm và Đầy đủ Ưu Đãi, chúng tôi luôn
                            cung cấp tới khách hàng thông tin, chính sách bán hàng đầy đủ, kịp thời, rõ ràng, cùng với phương thức
                            thanh toán an toàn, tiện lợi. Giờ đây, khách hàng có thể mua BĐS ở bất cứ đâu, bất cứ lúc nào, với chỉ
                            vài thao tác trên máy tính hoặc điện thoại di động. Hãy cùng chúng tôi trải nghiệm một nền tảng số hoàn
                            toàn mới!
                        </p>
                        <p className="text-lg font-semibold">TRUNG TÂM BÁN HÀNG TRỰC TUYẾN</p>
                        <p className="text-md">&copy; 2023 Vinhomes Online. All rights reserved.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <FaPhone className="w-6 h-6 mr-4 text-blue-600" />
                            <div>
                                <span className="text-lg font-semibold">Hotline - 1900 2323 89</span>
                                <p className="text-md">(Giờ làm việc 24/7)</p>
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
                    <h3 className="text-3xl font-bold text-gray-900">Từ những năm 1980</h3>
                    <p className="text-lg text-gray-700">
                        Công ty Bất Động Sản Vin Group đã khởi sự từ một văn phòng nhỏ ở trung tâm Thành Phố Hồ Chí Minh với mục tiêu trở thành nhà cung cấp bất động sản hàng đầu tại Việt Nam. Ban đầu, công ty chỉ có một vài nhân viên, nhưng với sự lãnh đạo sáng suốt và tầm nhìn xa của người sáng lập - ông Nguyễn Vin Group, công ty đã từng bước xây dựng uy tín và phát triển mạnh mẽ.
                    </p>
                    <p className="text-lg text-gray-700">
                        Trong suốt hơn 40 năm hoạt động, Vin Group không ngừng mở rộng quy mô và nâng cao chất lượng dịch vụ. Đến nay, Vin Group không chỉ là cái tên đứng sau hàng loạt dự án chung cư cao cấp, biệt thự sang trọng mà còn là đối tác tin cậy của nhiều nhà đầu tư bất động sản lớn trong và ngoài nước.
                    </p>
                    {/* Dự Án Tiêu Biểu */}
                    <div className="space-y-6">
                        <p className="text-xl font-semibold">Dự Án Tiêu Biểu:</p>
                        <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                            <li>
                                <strong>Khu Đô Thị Thành Đạt Riverside</strong>: Mang lại không gian sống xanh, trong lành cho cư dân với các tiện ích đẳng cấp.
                                <div className="mt-2">
                                    <img src="https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2023_07/gDEHQfH0_1689751750.jpeg?itok=R6lbOml4" alt="Thành Đạt Riverside" className="rounded-lg shadow-md" />
                                </div>
                            </li>
                            <li>
                                <strong>Thành Đạt Tower</strong>: Biểu tượng mới của sự thịnh vượng tại trung tâm thành phố.
                                <div className="mt-2">
                                    <img src="https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2021_02/Secton 1 (Headbanner)_2.jpg?itok=317k4AVs" alt="Thành Đạt Tower" className="rounded-lg shadow-md" />
                                </div>
                            </li>
                            <li>
                                <strong>Biệt Thự Sinh Thái Thành Đạt Hill</strong>: Sự kết hợp hoàn hảo giữa thiên nhiên và kiến trúc.
                                <div className="mt-2">
                                    <img src="https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2023_04/PC02_OP3 The Crown_Tổng thể công viên hướng BBQ_1681119684.jpg?itok=vExYeqVS" alt="Thành Đạt Hill" className="rounded-lg shadow-md" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p className="text-lg text-gray-700">
                        Với đội ngũ chuyên gia giàu kinh nghiệm, công nghệ tiên tiến và sự tập trung vào chất lượng dịch vụ, Vin Group tự hào là lựa chọn hàng đầu cho khách hàng và nhà đầu tư khi tìm kiếm giải pháp bất động sản tốt nhất.
                    </p>
                    <p className="text-lg text-gray-700">
                        Trong tương lai, Vin Group tiếp tục hướng tới mục tiêu mở rộng quy mô quốc tế, mang thương hiệu và dịch vụ Việt Nam ra thế giới, đồng thời không ngừng nâng cao chất lượng cuộc sống cho cộng đồng.
                    </p>
                </div>
            </div>
        </div>
    );
};
