// RealEstateListing.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import RealEstateCard from './RealEstateCard';
import SearchBar from './SearchBar';

const RealEstateListing = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesResponse = await axios.get('https://localhost:7137/api/Buildings');
        let propertiesData = propertiesResponse.data;

        const imageFetchPromises = propertiesData.map(async (property) => {
          try {
            // Fetch the image as a blob
            const response = await axios.get(`https://localhost:7137/api/Buildings/GetImage/${property.buildingId}`, { responseType: 'blob' });
            // Create a local URL for the image blob
            property.images = URL.createObjectURL(response.data);
          } catch (imagesError) {
            console.error('Error fetching images:', imagesError);
            property.image = ''; // Default to an empty string in case of an error
          }
        });

        // Wait for all the images to be fetched
        await Promise.all(imageFetchPromises);

        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties: ', error);
      }
    };

    fetchProperties();
  }, []);

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const handleSearch = () => {
    const searchQuery = searchTerm.toLowerCase().trim();

    const filteredResults = properties.filter((property) =>
      property.name.toLowerCase().includes(searchQuery) ||
      property.status.toLowerCase().includes(searchQuery)
    );
    setFilteredProperties(filteredResults);
  };

  return (
    <>
      <Header />
      <div className="container real-estate-listing">
        <SearchBar onSearchChange={handleSearchChange} onSearch={handleSearch} />
        <div className="results-count">Có {filteredProperties.length} kết quả phù hợp</div>
        <div className="row">
          {filteredProperties.map((property) => (
            <div className="col-md-4" key={property.buildingId}>
              <RealEstateCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RealEstateListing;
