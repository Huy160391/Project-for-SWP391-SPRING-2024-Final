import React, { useState } from 'react';

const FilterAll = () => {
    const [selectedProject, setSelectedProject] = useState("Vinhomes Ocean Park");
    const [selectedSubdivision, setSelectedSubdivision] = useState("Sapphire 2");
    const [selectedBuilding, setSelectedBuilding] = useState("S2.01");
    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [isSubdivisionOpen, setIsSubdivisionOpen] = useState(false);
    const [isBuildingOpen, setIsBuildingOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setIsProjectOpen(false);
    };

    const handleSubdivisionSelect = (subdivision) => {
        setSelectedSubdivision(subdivision);
        setIsSubdivisionOpen(false);
    };

    const handleBuildingSelect = (building) => {
        setSelectedBuilding(building);
        setIsBuildingOpen(false);
    };

    return (
        
<div className="flex justify-center mt-4">
<div className="flex  items-center border-2 border-amber-200 bg-white rounded-full font-serif">
    <div className="relative">
    <button className="px-4 py-2 mr-16 flex items-center border-r border-gray-300 text-black" onClick={() => setIsProjectOpen(!isProjectOpen)}>
        <span className="mr-2">{selectedProject}</span>
        <i className="fas fa-chevron-down"></i>
    </button>
    <div className={`dropdown-menu absolute left-0 mt-2 bg-white font-serif rounded-md shadow-lg ${isProjectOpen ? 'block' : 'hidden'}`}>
        <ul className="py-2">
            <li className="px-8 py-2 hover:bg-gray-100 font-serif " onClick={() => handleProjectSelect("Vinhomes Ocean Park")}>Vinhomes Ocean Park</li>
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleProjectSelect("Vinhomes Smart City")}>Vinhomes Smart City</li>
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleProjectSelect("Vinhomes Ocean Park 3 - The Crown")}>Vinhomes Ocean Park 3 - The Crown</li>
        </ul>
    </div>
</div>
<div className="relative">
    <button className="px-4 py-2 flex items-center border-r border-gray-300 mr-16 text-black" onClick={() => setIsSubdivisionOpen(!isSubdivisionOpen)}>
        <span className="mr-2">{selectedSubdivision}</span>
        <i className="fas fa-chevron-down"></i>
    </button>
    <div className={`dropdown-menu absolute left-0 mt-2 bg-white rounded-md shadow-lg ${isSubdivisionOpen ? 'block' : 'hidden'}`}>
        <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleSubdivisionSelect("Sapphire 2")}>Sapphire 2</li>
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleSubdivisionSelect("Sapphire 1")}>Sapphire 1</li>
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleSubdivisionSelect("Ruby 1")}>Ruby 1</li>
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleSubdivisionSelect("Pavilion")}>Pavilion</li>
        </ul>
    </div>
</div>
<div className="relative">
    <button className="px-4 py-2 flex items-center mr-10 text-black" onClick={() => setIsBuildingOpen(!isBuildingOpen)}>
        <span className="mr-2">{selectedBuilding}</span>
        <i className="fas fa-chevron-down"></i>
    </button>
    <div className={`dropdown-menu absolute left-0 mt-2 bg-white rounded-md shadow-lg ${isBuildingOpen ? 'block' : 'hidden'}`}>
        <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleBuildingSelect("S2.01")}>S2.01</li>
            <li className="px-4 py-2 hover:bg-gray-100 font-serif" onClick={() => handleBuildingSelect("S2.02")}>S2.02</li>
            {/* Other dropdown items */}
        </ul>
    </div></div><div className="">
    <button type="button" className="bg-amber-400 hover:bg-yellow-600 text-white font-bold py-3 px-5 rounded-full flex items-center ml-5">
        <i className="fas fa-search"></i>
        Search
    </button>
</div>
</div>




</div>


    );
};

export default FilterAll;
