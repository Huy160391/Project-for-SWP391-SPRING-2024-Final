// AgencyListing.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import AgencyCard from "./AgencyCard";
import "./AgencyListing.css"; // Ensure you have this CSS file
import SearchBar from "./SearchBar";

const AgencyListing = () => {
  const [agencies, setAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get("https://localhost:7137/api/Agencies");
        setAgencies(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAgencies();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const searchQuery = searchTerm.toLowerCase().trim();

    const filteredResults = agencies.filter((agency) => {
      // Combine the firstname and lastname into a single string
      const fullName = `${agency.firstname} ${agency.lastname}`.toLowerCase();
      return fullName.includes(searchQuery);
    });

    setAgencies(filteredResults); // Update the filteredAgencies state with the filtered results
  };

  return (
    <div className="user-listing-page">
      <SearchBar onSearchChange={handleSearchChange} onSearch={handleSearch} />
      <div className="results-count mb-3">
        Có {agencies.length} kết quả phù hợp
      </div>
      <div className="row">
        {agencies.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <AgencyCard {...user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyListing;
