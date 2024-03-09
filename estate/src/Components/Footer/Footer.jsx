import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <div className="logo">
                        <h1>VINHOMES</h1>
                    </div>
                    <div className="footer-info">
                        <p>Sản phẩm của team 3. Trang phân phối căn hộ theo kênh đại lý. Cập nhật nhanh chóng nhiều căn hộ sang, xịn, mịn đến thuộc các dự án của Vinhomes</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-menu">
                        <ul>
                            <li><span>Điều khoản dịch vụ</span></li>
                            <li><span>Chính sách bảo mật</span></li>
                            <li><span>Về bản quyền</span></li>
                            <li><span>Tổng đài chăm sóc khách hàng : 1900 2323 89</span></li>
                        </ul>
                    </div>
                    <div className="copyright">
                        <p>&copy;2024. Toàn bộ bản quyền thuộc Vinhomes JSC. Một thành viên của Tập đoàn Vingroup.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
