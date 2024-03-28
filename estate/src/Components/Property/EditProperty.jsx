import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditApartment = () => {
  const { apartmentId } = useParams();

  const [apartment, setApartment] = useState({
    apartmentId: "",
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    furniture: "",
    price: 0,
    area: 0,
    description: "",
    apartmentType: null, // Updated property name to match the state

    agencyId: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7137/api/Apartments/${apartmentId}`
        );
        setApartment(response.data);
      } catch (error) {
        console.error("Error fetching apartment:", error);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApartment((prevState) => ({
      ...prevState,
      apartmentType: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("apartmentId", apartment.apartmentId);
    formData.append("description", apartment.description);
    formData.append("numberOfBedrooms", apartment.numberOfBedrooms);
    formData.append("numberOfBathrooms", apartment.numberOfBathrooms);
    formData.append("price", apartment.price);
    formData.append("furniture", apartment.furniture);
    formData.append("area", apartment.area);
    formData.append("apartmentType", apartment.apartmentType);

    try {
      if (apartment.ApartmentType === undefined) {
        delete apartment.ApartmentType; // Remove ApartmentType from the object
      }

      await axios.put(
        `https://localhost:7137/api/Apartments/UpdateApartment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 font-serif">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-4"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Edit Apartment
        </h1>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="apartmentId"
          >
            Apartment ID
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="apartmentId"
            type="text"
            value={apartment.apartmentId}
            disabled
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="description"
            type="text"
            name="description"
            value={apartment.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="numberOfBedrooms"
          >
            Number of Bed Rooms
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="numberOfBedrooms"
            type="number"
            min="1"
            name="numberOfBedrooms"
            value={apartment.numberOfBedrooms}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="numberOfBathrooms"
          >
            Number of Bath Rooms
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="numberOfBathrooms"
            type="number"
            min="1"
            name="numberOfBathrooms"
            value={apartment.numberOfBathrooms}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="price"
            type="number"
            name="price"
            min="0"
            value={apartment.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="furniture"
          >
            Furniture
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="furniture"
            type="text"
            name="furniture"
            value={apartment.furniture}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="area"
          >
            Area
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="area"
            type="number"
            name="area"
            min="0"
            value={apartment.area}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="apartmentType"
          >
            Apartment Type
          </label>
          <input
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            id="apartmentType"
            type="file"
            name="apartmentType"
            onChange={handleFileChange}
          />
        </div>
        {updateSuccess && (
          <p className="text-green-500 text-sm font-medium">
            Apartment updated successfully!
          </p>
        )}
        <div className="flex items-center justify-between space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <a
            href={`/propertydetail/${apartmentId}`}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </a>
          <a
            href="/property"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Property
          </a>
        </div>
      </form>
    </div>
  );
};

export default EditApartment;
