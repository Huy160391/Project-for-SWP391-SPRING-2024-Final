// Import các dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Component HomePageDecoration
const HomePageDecorationBuilding = () => {
    // Khởi tạo state cho danh sách tòa nhà và trạng thái loading
    const [buildings, setBuildings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [buildingIdResponses, setBuildingIdResponses] = useState([]);

    // Effect hook để lấy danh sách tòa nhà từ API khi component được mount hoặc khi buildingIdResponses thay đổi
    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await axios.get('https://localhost:7137/api/Buildings');
                const allBuildings = response.data;
                const matchedBuildings = allBuildings.filter(building => buildingIdResponses.includes(building.buildingId));
                console.log("b", matchedBuildings)
                setBuildings(matchedBuildings); // Cập nhật danh sách tòa nhà
            } catch (error) {
                console.error("Error fetching Buildings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuildings();
    }, [buildingIdResponses]); // Thêm buildingIdResponses vào dependency array

    // Effect hook để lấy danh sách tòa nhà được booking nhiều nhất từ API khi component được mount
    // Effect hook để lấy danh sách tòa nhà được booking nhiều nhất từ API khi component được mount
    useEffect(() => {
        const fetchTopBookingBuildings = async () => {
            try {
                const response = await axios.get('https://localhost:7137/api/Bookings');
                const apartmentIds = response.data.map(booking => booking.apartmentId);
                const counts = {};
                apartmentIds.forEach(apartmentId => counts[apartmentId] ? counts[apartmentId]++ : counts[apartmentId] = 1);
                const sortedApartmentIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
                const topApartmentIds = sortedApartmentIds.slice(0);
                console.log("a1", topApartmentIds);
                // Lấy danh sách buildingId từ mỗi top apartmentId mà chưa được xử lý
                const responses = await Promise.all(topApartmentIds.map(async (apartmentId) => {
                    const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/GetListBuildingIdByApartmentId/${apartmentId}`);

                    return apartmentResponse.data; // Trả về buildingId trực tiếp
                }));

                console.log("a", responses);

                // Xóa bỏ buildingId trùng lặp và giới hạn danh sách chỉ 4 buildingId
                const uniqueBuildingIdResponses = [...new Set(responses.flat())].slice(0, 4);

                // Update buildingIdResponses state
                setBuildingIdResponses(uniqueBuildingIdResponses);
            } catch (error) {
                console.error("Error fetching top booking buildings:", error);
            }
        };

        fetchTopBookingBuildings();
    }, []);


    // Function xử lý sự kiện thay đổi từ khóa tìm kiếm
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Filter danh sách tòa nhà dựa trên khóa tìm kiếm
    const filteredBuildings = buildings.filter(building => {
        return building && building.name && building.name.toLowerCase().includes(searchTerm);
    });
    const firstBuildingId = filteredBuildings.length > 0 ? filteredBuildings[0].buildingId : null;


    // Render component
    return (
        <section className="py-0 bg-scroll " style={{ backgroundImage: `url('https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>

            <div className=" w-full  bg-amber-100 bg-opacity-70 py-12">


                <div className="container  mx-auto px-4 ">
                    <div className="relative">
                        <h2 className="text-4xl font-serif items-center text-amber-500 text-center mb-8">The top-selling building</h2>
                        <h2 className="absolute container text-4xl font-serif items-center text-amber-400 text-center mb-8" style={{ top: '-2px', left: '2px', zIndex: 1 }}>The top-selling building</h2>
                    </div>

                    {/* Hiển thị danh sách tòa nhà */}


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                        {isLoading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            filteredBuildings.map((building, index) => (
                                <div key={building.buildingId} className="relative bg-gray  bg-white  rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 text-justify">
                                    <img
                                        className="w-full h-96 object-cover rounded-t-lg "
                                        src={`https://localhost:7137/api/Buildings/GetImage/${building.buildingId}` || "https://vinhomesland.vn/wp-content/uploads/2022/11/phan-khu-the-beverly-solari-vinhomes-grand-park.jpg"}
                                        alt={building.name}
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition duration-300"></div>

                                    <div className="absolute bg-gray-600 w-full h-auto bg-opacity-100 md:bg-opacity-60 lg:bg-opacity-50 xl:bg-opacity-40 top-0 left-0 p-6 text-amber-500">
                                        <h3 className="text-4xl font-serif mb-2">{`Top ${index + 1}: ${building.name}`}</h3>
                                        <p className="text-xl mb-2 font-serif">Address: {building.address}</p>
                                        

                                    </div>
                                    <div className="absolute bg-gray bg-opacity-50 bottom-0 left-0 right-0 p-6 bg-amber-50 bg-opacity-90 flex justify-between items-center">
                                        <Link
                                            to={`/property/${building.buildingId}`}
                                            className="h-full w-full text-amber-500  text-xl absolute font-serif hover:underline"
                                        >
                                            View Apartment
                                        </Link>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div></div>
        </section>
    );
};

export default HomePageDecorationBuilding;

