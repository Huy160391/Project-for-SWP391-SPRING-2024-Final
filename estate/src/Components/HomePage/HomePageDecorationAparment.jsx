import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePageDecorationAparment = () => {
    const [apartments, setApartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [buildingNames, setBuildingNames] = useState({});

    useEffect(() => {
        const fetchTopBookingApartments = async () => {
            try {
                const response = await axios.get('https://localhost:7137/api/Bookings');
                const apartmentIds = response.data.map(booking => booking.apartmentId);
                const counts = {};
                apartmentIds.forEach(apartmentId => counts[apartmentId] ? counts[apartmentId]++ : counts[apartmentId] = 1);
                const sortedApartmentIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
                const topApartmentIds = sortedApartmentIds.slice(0, 4);

                const responses = await Promise.all(topApartmentIds.map(async (apartmentId) => {
                    const apartmentResponse = await axios.get(`https://localhost:7137/api/Apartments/${apartmentId}`);
                    return apartmentResponse.data;
                }));
                console.log("a", responses);
                setApartments(responses);
            } catch (error) {
                console.error("Error fetching top booking apartments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopBookingApartments();
    }, []);

    useEffect(() => {
        const fetchBuildingNames = async () => {
            const names = {};
            for (const apartment of apartments) {
                try {
                    const response = await axios.get(`https://localhost:7137/api/Buildings/${apartment.buildingId}`);
                    names[apartment.apartmentId] = response.data.name;
                } catch (error) {
                    console.error(`Error fetching building name for apartment ${apartment.apartmentId}:`, error);
                    names[apartment.apartmentId] = "Unknown Building";
                }
            }
            setBuildingNames(names);
        };

        if (!isLoading && apartments.length > 0) {
            fetchBuildingNames();
        }
    }, [apartments, isLoading]);

    return (
        <section className="py-0 bg-scroll font-serif" style={{ backgroundImage: `url('https://storage.googleapis.com/vinhomes-data-02/styles/images_870_x_530/public/2021_02/Secton 1 (Headbanner)_2.jpg?itok=317k4AVs')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className="w-full bg-amber-100 bg-opacity-70 py-12">
                <div className="container mx-auto px-4">
                    <div className="relative">
                        <h2 className="text-4xl font-bold items-center text-amber-400 text-center mb-8">The top-selling apartment</h2>
                        <h2 className="absolute container text-4xl font-bold items-center text-amber-300 text-center mb-8" style={{ top: '-2px', left: '2px', zIndex: 1 }}>The top-selling apartment</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {isLoading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            apartments.map((apartment, index) => (
                                <div key={apartment.apartmentId} className="relative bg-gray bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
                                    <img
                                        className="w-full h-96 object-cover rounded-t-lg"
                                        src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}` || "https://vinhomesland.vn/wp-content/uploads/2022/11/phan-khu-the-beverly-solari-vinhomes-grand-park.jpg"}
                                        alt={apartment.name}
                                    />
                                   
                                    <div className="absolute bg-gray-600 w-full bg-opacity-100 md:bg-opacity-60 lg:bg-opacity-50 xl:bg-opacity-40 top-0 left-0 p-6 text-amber-500 ">
                                        <h3 className="text-4xl font-bold mb-2">{`Top ${index + 1}: Room ${apartment.apartmentId.split(':')[1].trim()}`}</h3>
                                        <h3 className="text-2xl font-bold mb-2">{`Building: ${buildingNames[apartment.apartmentId] || "Unknown Building"}`}</h3>
                                    </div>
                                    <div className="absolute bg-gray bg-opacity-50 bottom-0 left-0 right-0 p-6 bg-amber-50 bg-opacity-90 flex justify-between items-center">
                                        <Link
                                            to={`/propertydetail/${apartment.apartmentId}`}
                                            className="h-full w-full text-amber-500 text-xl absolute font-bold hover:underline"
                                        >
                                            View Apartment
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePageDecorationAparment;
