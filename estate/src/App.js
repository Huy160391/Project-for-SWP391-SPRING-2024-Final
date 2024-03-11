import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AgencyListing from './Components/Agency/AgencyListing';
import AgencyDetail from './Components/AgencyDetail/AgencyDetail';
import AddNewAgency from './Components/DashboardInvestor/AddNewAgency';
import CreateNewProject from './Components/DashboardInvestor/CreateNewBuilding';
import InvestorDashboard from './Components/DashboardInvestor/DashboardInvestor';
import './output.css';

//import DistributeApartment from './Components/DashboardInvestor/DistributeApartment';

import ListBooking from './Components/Agency/ListBooking';


import EditApartmentPage from './Components/DashboardApartmentTool/EditApartmentPage';
import ManagerListApartmentOfAgency from './Components/DashboardApartmentTool/ManagerListApartmentOfAgency';
import ReceiveFloorDistribution from './Components/DashboardApartmentTool/ReceiveFloorDistribution';
import DistributeFloor from './Components/DashboardInvestor/DistributeFloor';
import Managerbuildings from './Components/DashboardInvestor/ManagerBuilding';
import ManagerDistribute from './Components/DashboardInvestor/ManagerDistribute';
import ManagerUsers from './Components/DashboardInvestor/ManagerUsers';
import CreateNewPost from './Components/DashboardPostTool/CreateNewPost';
import EditPostPage from './Components/DashboardPostTool/EditPostPage';
import ManagerPosts from './Components/DashboardPostTool/ManagerPosts';
import ViewPostPage from './Components/DashboardPostTool/ViewPostPage';
import Homepage from './Components/HomePage/HomePage';
import Login from './Components/Login/Login';
import EditProperty from './Components/Property/EditProperty';
import PropertyDetail from './Components/Property/PropertyDetail';
import PropertyList from './Components/Property/PropertyList';
import RealEstateListing from './Components/RealEstate/RealEstateListing';
import RealEstateDetail from './Components/RealEstateDetail/RealEstateDetail';
import Registration from './Components/Register/RegistrationForm';




// import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App" style={{width:'100vw', height:'100vh'}}>
      {/* <Header /> */}
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/registration" element={<Registration />} />
        <Route path="/addnewagency" element={<AddNewAgency />} />
        <Route path="/distributefloor" element={<DistributeFloor />} />
        <Route path="/createnewproject" element={<CreateNewProject />} />
        <Route path="/managerdistribute" element={<ManagerDistribute />} />
        <Route path="/managerusers" element={<ManagerUsers />} />
        <Route path="/managerbuildings" element={<Managerbuildings />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
        <Route path="/realestatelisting" element={<RealEstateListing />} />
        <Route path="/realestate/:buildingId" element={<RealEstateDetail />} />
        <Route path="/property/:buildingId" element={<PropertyList />} />
        <Route path="/agency" element={<AgencyListing />} />
        <Route path="/agencydetail" element={<AgencyDetail />} />
        <Route path="/propertydetail/:apartmentId" element={<PropertyDetail />} />
        <Route path="/editproperty/:apartmentId" element={<EditProperty />} />
        <Route path="/listbooking/:apartmentId" element={<ListBooking />} />
        
        
        
        {/* Post tool box */}
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
        <Route path="/view-post/:postId" element={<ViewPostPage />} />
        <Route path="/createnewpost" element={<CreateNewPost />} />
        <Route path="/managerpost" element={<ManagerPosts />} />
        <Route path="/ReceiveFloorDistribution/:agencyId" element={<ReceiveFloorDistribution/>} />
        <Route path="/ManagerListApartmentOfAgency/:agencyId/:buildingId" element={<ManagerListApartmentOfAgency />} />
        <Route path="/edit-apartment/:apartmentId" element={<EditApartmentPage />} />

        {/* <Route path="/login" element={<Login />} /> */}
        {/* The Route for RealEstateListing should also have a path defined */}
        {/* Define other routes here */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
