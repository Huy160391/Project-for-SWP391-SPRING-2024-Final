import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ManagerListApartmentOfAgency = () => {
    const { agencyId, buildingId } = useParams();
    const [apartments, setApartments] = useState([]);
    const [buildingName, setBuildingName] = useState('');
    const [searchParams, setSearchParams] = useState({
        numberOfBedrooms: '',
        numberOfBathrooms: '',
        furniture: '',
        areaFrom: '',
        areaTo: '',
        priceFrom: '',
        priceTo: '',
        floorNumber: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch building name
                const buildingResponse = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);
                setBuildingName(buildingResponse.data.name);

                // Fetch apartments data
                const apartmentsResponse = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByAgencyIdAndBuildingId/${agencyId}/${buildingId}`);
                const fetchedApartments = apartmentsResponse.data;

                // Fetch room numbers for each apartment
                const apartmentsWithDetails = await Promise.all(
                    fetchedApartments.map(async (apartment) => {
                        try {
                            const roomResponse = await axios.get(`https://localhost:7137/api/Apartments/GetRoomNumberByApartmentId/${apartment.apartmentId}`);
                            return { ...apartment, roomNumber: roomResponse.data };
                        } catch (error) {
                            console.error("Error fetching room number:", error);
                            return { ...apartment, roomNumber: "N/A" };
                        }
                    })
                );

                setApartments(apartmentsWithDetails);
                setOriginalApartments(apartmentsWithDetails); // Set original apartments for reset
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [agencyId, buildingId]);

    const [originalApartments, setOriginalApartments] = useState([]);

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Lấy ra các giá trị thực tế của mỗi trường tìm kiếm
        const {
            numberOfBedrooms,
            numberOfBathrooms,
            furniture,
            floorNumber,
            areaFrom,
            areaTo,
            priceFrom,
            priceTo
        } = searchParams;

        // Lọc danh sách căn hộ dựa trên các điều kiện tìm kiếm
        const filtered = originalApartments.filter(apartment => (
            (!numberOfBedrooms || apartment.numberOfBedrooms === parseInt(numberOfBedrooms)) &&
            (!numberOfBathrooms || apartment.numberOfBathrooms === parseInt(numberOfBathrooms)) &&
            (!furniture || apartment.furniture === furniture) &&
            (!floorNumber || apartment.floorNumber.toString() === floorNumber) &&
            (!areaFrom || apartment.area >= Number(areaFrom)) &&
            (!areaTo || apartment.area <= Number(areaTo)) &&
            (!priceFrom || apartment.price >= Number(priceFrom)) &&
            (!priceTo || apartment.price <= Number(priceTo))
        ));

        // Cập nhật danh sách căn hộ hiển thị sau khi lọc
        setApartments(filtered);
    };

    const handleCancel = () => {
        setSearchParams({
            numberOfBedrooms: '',
            numberOfBathrooms: '',
            furniture: '',
            areaFrom: '',
            areaTo: '',
            priceFrom: '',
            priceTo: '',
            floorNumber: ''
        });
        setApartments(originalApartments);
    };

    const uniqueValues = (fieldName) => {
        return [...new Set(originalApartments.map(apartment => apartment[fieldName]))];
    };

    // Sử dụng uniqueValues để lấy các giá trị tương ứng cho các trường tìm kiếm
    const bedroomOptions = uniqueValues('numberOfBedrooms');
    const bathroomOptions = uniqueValues('numberOfBathrooms');
    const furnitureOptions = uniqueValues('furniture');
    const floorNumberOptions = uniqueValues('floorNumber');

    const floorNumbers = React.useMemo(() => {
        return [...new Set(apartments.map(apartment => apartment.floorNumber))].sort((a, b) => a - b);
    }, [apartments]);

    return (
        <div className="flex min-h-screen bg-gray-50 font-serif">
            <div className="flex-grow p-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-10">{buildingName} Apartments</h1>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-3  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 
                    rounded shadow-lg transition duration-300 ease-in-out transform 
                    hover:-translate-y-1 hover:scale-105 w-32">
                    Back
                </button>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-10">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Dropdowns for Number of Bedrooms, Number of Bathrooms, Furniture, and Floor Number */}
                        <div className="relative">
                            <select
                                name="numberOfBedrooms"
                                onChange={handleChange}
                                value={searchParams.numberOfBedrooms}
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Number of Bedrooms</option>
                                {bedroomOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        {/* Other dropdowns follow the same structure */}
                        <div className="relative">
                            <select
                                name="numberOfBathrooms"
                                onChange={handleChange}
                                value={searchParams.numberOfBathrooms}
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Number of Bathrooms</option>
                                {bathroomOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                name="furniture"
                                onChange={handleChange}
                                value={searchParams.furniture}
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Furniture</option>
                                {furnitureOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                name="floorNumber"
                                onChange={handleChange}
                                value={searchParams.floorNumber}
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Floor Number</option>
                                {floorNumberOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        {/* Dropdowns for Area From, Area To, Price From, and Price To */}
                        <div className="col-span-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <select
                                        name="areaFrom"
                                        onChange={handleChange}
                                        value={searchParams.areaFrom}
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Area From</option>
                                        {[100, 200, 300, 400].map((value, index) => (
                                            <option key={index} value={value}>{value} sqm</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative">
                                    <select
                                        name="areaTo"
                                        onChange={handleChange}
                                        value={searchParams.areaTo}
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Area To</option>
                                        {[500, 600, 700, 800].map((value, index) => (
                                            <option key={index} value={value}>{value} sqm</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative">
                                    <select
                                        name="priceFrom"
                                        onChange={handleChange}
                                        value={searchParams.priceFrom}
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Price From</option>
                                        {[100000, 200000, 300000, 400000].map((value, index) => (
                                            <option key={index} value={value}>${value.toLocaleString()}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative">
                                    <select
                                        name="priceTo"
                                        onChange={handleChange}
                                        value={searchParams.priceTo}
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Price To</option>
                                        {[500000, 600000, 700000, 800000].map((value, index) => (
                                            <option key={index} value={value}>${value.toLocaleString()}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        Search
                    </button>
                    <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancel Search
                    </button>
                </form>

                <div className="space-y-10">
                    {apartments.map((apartment) => (
                        <div key={apartment.apartmentId} className="bg-white shadow-xl overflow-hidden rounded-lg p-6 flex space-x-6 items-center">
                            <img src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`} alt="Apartment" className="h-48 w-60 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" />
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="text-2xl font-semibold text-gray-800">{apartment.roomNumber}</span>
                                </div>
                                <ul className="list-disc space-y-1 ml-5 text-gray-600">
                                    <li>Number of Bedrooms: {apartment.numberOfBedrooms}</li>
                                    <li>Number of Bathrooms: {apartment.numberOfBathrooms}</li>
                                    <li>Furniture: {apartment.furniture}</li>
                                    <li>Area: {apartment.area} sqm</li>
                                    <li>Price: ${apartment.price ? apartment.price.toLocaleString() : 'N/A'}</li>
                                    <li>Description: {apartment.description}</li>
                                    <li>Status: {apartment.status}</li>
                                    <li>Floor Number: {apartment.floorNumber}</li>
                                </ul>
                            </div>
                            <Link to={`/viewlistbooking/${apartment.apartmentId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                                View List Booking
                            </Link>
                            <Link to={`/edit-apartment/${apartment.apartmentId}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                                Edit
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ManagerListApartmentOfAgency;
