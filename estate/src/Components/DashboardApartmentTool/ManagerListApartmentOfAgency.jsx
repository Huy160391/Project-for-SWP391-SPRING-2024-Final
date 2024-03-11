import React, { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "./Sidebar";

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

    useEffect(() => {
        const fetchData = async () => {
            const buildingResponse = await axios.get(`https://localhost:7137/api/Buildings/${buildingId}`);
            setBuildingName(buildingResponse.data.name);

            const apartmentsResponse = await axios.get(`https://localhost:7137/api/Apartments/GetApartmentsByAgencyIdAndBuildingId/${agencyId}/${buildingId}`);
            setApartments(apartmentsResponse.data);
            setOriginalApartments(apartmentsResponse.data)
        };
        fetchData();
    }, [agencyId, buildingId]);
    const [originalApartments, setOriginalApartments] = useState([]);

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (Object.values(searchParams).every(param => param === '')) {
            // Nếu không có điều kiện tìm kiếm, đặt lại về danh sách gốc
            setApartments(originalApartments);
        } else {
            const filtered = originalApartments.filter(apartment => (
                (!searchParams.numberOfBedrooms || apartment.numberOfBedrooms === parseInt(searchParams.numberOfBedrooms)) &&
                (!searchParams.numberOfBathrooms || apartment.numberOfBathrooms === parseInt(searchParams.numberOfBathrooms)) &&
                (!searchParams.furniture || apartment.furniture === searchParams.furniture) &&
                (!searchParams.floorNumber || apartment.floorNumber.toString() === searchParams.floorNumber) &&
                (!searchParams.areaFrom || apartment.area >= Number(searchParams.areaFrom)) &&
                (!searchParams.areaTo || apartment.area <= Number(searchParams.areaTo)) &&
                (!searchParams.priceFrom || apartment.price >= Number(searchParams.priceFrom)) &&
                (!searchParams.priceTo || apartment.price <= Number(searchParams.priceTo))
            ));
            setApartments(filtered);
        }
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
        // Potentially re-fetch the apartments or set to original fetched list if not mutated
        // This step depends on whether you mutate the original apartments list on search
        // For this example, assuming re-fetch is not necessary if the original list is not mutated
        // setApartments(originalApartments); // Assuming originalApartments is the unfiltered list saved elsewhere
    };

    // Compute floorNumbers after apartments are fetched
    const floorNumbers = React.useMemo(() => {
        return [...new Set(apartments.map(apartment => apartment.floorNumber))].sort((a, b) => a - b);
    }, [apartments]);


    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-grow p-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-10">{buildingName} Apartments</h1>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-10">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <select name="numberOfBedrooms" onChange={handleChange} value={searchParams.numberOfBedrooms}>
                            <option value="">Number of Bedrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <select name="numberOfBathrooms" onChange={handleChange} value={searchParams.numberOfBathrooms}>
                            <option value="">Number of Bathrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>

                        <select name="furniture" onChange={handleChange} value={searchParams.furniture}>
                            <option value="">Furniture</option>
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Partially Furnished">Partially Furnished</option>
                            <option value="Not Furnished">Not Furnished</option>
                        </select>
                        <select name="floorNumber" onChange={handleChange} value={searchParams.floorNumber}>
                            <option value="">Floor Number</option>
                            {floorNumbers.map((floorNumber, index) => (
                                <option key={index} value={floorNumber}>{floorNumber}</option>
                            ))}
                        </select>
                        <input type="text" name="areaFrom" onChange={handleChange} placeholder="Area From" value={searchParams.areaFrom} />
                        <input type="text" name="areaTo" onChange={handleChange} placeholder="Area To" value={searchParams.areaTo} />
                        <input type="text" name="priceFrom" onChange={handleChange} placeholder="Price From" value={searchParams.priceFrom} />
                        <input type="text" name="priceTo" onChange={handleChange} placeholder="Price To" value={searchParams.priceTo} />


                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 " onChange={handleSearch}>
                        Search
                    </button>
                    <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </form>
                <div className="space-y-10">
                    {apartments.map((apartment, index) => (
                        <div key={index} className="bg-white shadow-xl overflow-hidden rounded-lg p-6 flex space-x-6 items-center">
                            <img className="h-48 w-60 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" src={`https://localhost:7137/api/Apartments/GetApartmentImage/${apartment.apartmentId}`} alt="Apartment Type" />
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="text-2xl font-semibold text-gray-800">Apartment ID: {apartment.apartmentId}</span>
                                </div>
                                <ul className="list-disc space-y-1 ml-5 text-gray-600">
                                    <li>Number of Bedrooms: {apartment.numberOfBedrooms}</li>
                                    <li>Number of Bathrooms: {apartment.numberOfBathrooms}</li>
                                    <li>Furniture: {apartment.furniture}</li>
                                    <li>Area: {apartment.area} sqm</li>
                                    <li>Price: ${apartment.price ? apartment.price.toLocaleString() : 'N/A'}</li> {/* Updated this line */}
                                    <li>Description: {apartment.description}</li>
                                    <li>Status: {apartment.status}</li>
                                    <li>Floor Number: {apartment.floorNumber}</li>
                                </ul>
                               
                            </div>
                             <Link to={`/edit-apartment/${apartment.apartmentId}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Edit</Link>

                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};
export default ManagerListApartmentOfAgency;
