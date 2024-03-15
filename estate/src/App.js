import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AgencyListing from './Components/Agency/AgencyListing';
import AddNewAgency from './Components/DashboardInvestor/AddNewAgency';
import CreateNewProject from './Components/DashboardInvestor/CreateNewBuilding';
import InvestorDashboard from './Components/DashboardInvestor/DashboardInvestor';
import './output.css';

//import DistributeApartment from './Components/DashboardInvestor/DistributeApartment';

import ListBooking from './Components/Agency/ListBooking';
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


import { AboutUs } from './Components/AboutUs/AboutUs';
import AgentsPage from './Components/AgencyDetail/AgentsPage';
import BuildingListing from './Components/Building/BuildingListing';
import EditApartmentPage from './Components/DashboardAgency/EditApartmentPage';
import ManagerListApartmentOfAgency from './Components/DashboardAgency/ManagerListApartmentOfAgency';
import ReceiveFloorDistribution from './Components/DashboardAgency/ReceiveFloorDistribution';
import Footer from './Components/Footer/Footer';
import Example from './Components/Header/Header';

import AgencyProfile from './Components/DashboardAgency/AgencyProfile';
import DashboardToolOfAgency from './Components/DashboardAgency/DashboardToolOfAgency';
import ViewListBooking from './Components/DashboardAgency/ViewListBooking';
import EditBuilding from './Components/DashboardInvestor/EditBuilding';
import PostsListing from './Components/Post/PostsList';
import PostDetail from './Components/PostDetail/PostDetail';
import FeaturedProjects from './Components/Project/FeaturedProjects ';
import PropertyDetail from './Components/Property/ApartmentDetail';
import PropertyList from './Components/Property/ApartmentList';
import Registration from './Components/Register/RegistrationForm';


// import Login from './Components/Login/Login';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Example />
      
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addnewagency" element={<AddNewAgency />} />
        <Route path="/distributefloor" element={<DistributeFloor />} />
        <Route path="/createnewproject" element={<CreateNewProject />} />
        <Route path="/managerdistribute" element={<ManagerDistribute />} />
        <Route path="/managerusers" element={<ManagerUsers />} />
        <Route path="/managerbuildings" element={<Managerbuildings />} />
        <Route path="/editbuilding/:buildingId" element={<EditBuilding />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />

        <Route path="/property/:buildingId" element={<PropertyList />} />
        <Route path="/agency" element={<AgencyListing />} />
        <Route path="/agencydetail" element={<AgentsPage />} />
        <Route path="/propertydetail/:apartmentId" element={<PropertyDetail />} />
        <Route path="/editproperty/:apartmentId" element={<EditProperty />} />
        <Route path="/listbooking/:apartmentId" element={<ListBooking />} />
        <Route path="/projectlisting" element={<FeaturedProjects />} />
        <Route path="/buildinglisting" element={<BuildingListing />} />
        <Route path="/postslisting/:projectId" element={<PostsListing />} />
        <Route path="/postdetail/:postId" element={<PostDetail />} />

        {/* Post tool box */}
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
        <Route path="/view-post/:postId" element={<ViewPostPage />} />
        <Route path="/createnewpost" element={<CreateNewPost />} />
        <Route path="/managerpost" element={<ManagerPosts />} />
        <Route path="/ReceiveFloorDistribution/:agencyId" element={<ReceiveFloorDistribution/>} />
        <Route path="/ManagerListApartmentOfAgency/:agencyId/:buildingId" element={<ManagerListApartmentOfAgency />} />
        <Route path="/edit-apartment/:apartmentId" element={<EditApartmentPage />} />
        <Route path="/viewlistbooking/:apartmentId" element={<ViewListBooking />} />
        <Route path="/dashboard/:agencyId" element={<DashboardToolOfAgency />} />
        <Route path="/agencyprofile/:agencyId" element={<AgencyProfile />} />

        {/* <Route path="/login" element={<Login />} /> */}
        {/* The Route for RealEstateListing should also have a path defined */}
        {/* Define other routes here */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
