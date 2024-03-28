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
import ManagerListApartmentOfAgency from './Components/DashboardAgency/ManagerListApartmentOfAgency';
import ReceiveFloorDistribution from './Components/DashboardAgency/ReceiveFloorDistribution';
import Footer from './Components/Footer/Footer';
import Example from './Components/Header/Header';

import AgencyProfile from './Components/DashboardAgency/AgencyProfile';
import DashboardToolOfAgency from './Components/DashboardAgency/DashboardToolOfAgency';
import EditApartmentPage from './Components/DashboardAgency/EditApartmentPage';
import OrderHistoryOfAgency from './Components/DashboardAgency/OrderHistoryOfAgency';
import ViewListBooking from './Components/DashboardAgency/ViewListBooking';
import ViewOrderBillOfAgency from './Components/DashboardAgency/ViewOderBillOfAgency';
import CustomerProfile from './Components/DashboardCustomer/CustomerProfile';
import DashboardCustomer from './Components/DashboardCustomer/DashboardCustomer';
import OderHistoryOfCustomer from './Components/DashboardCustomer/OderHistoryOfCustomer';
import ViewBookingOfCustomer from './Components/DashboardCustomer/ViewBookingOfCustomer';
import ViewOderBillOfCustomer from './Components/DashboardCustomer/ViewOderBillOfCustomer';
import ConfimOderManager from './Components/DashboardInvestor/ConfimOderManager';
import ConfirmBookingManager from './Components/DashboardInvestor/ConfirmBookingManager';
import DistributeApartment from './Components/DashboardInvestor/DistributeApartment';
import EditBuilding from './Components/DashboardInvestor/EditBuilding';
import ManageApartmentOfInvestor from './Components/DashboardInvestor/ManageApartmentOfInvestor';
import ReviewUpdatedApartment from './Components/DashboardInvestor/ReviewUpdatedApartment';
import ViewHistoryOrder from './Components/DashboardInvestor/ViewHistoryOrder';
import PostsListing from './Components/Post/PostsList';
import PostDetail from './Components/PostDetail/PostDetail';
import FeaturedProjects from './Components/Project/FeaturedProjects ';
import PropertyDetail from './Components/Property/ApartmentDetail';
import PropertyList from './Components/Property/ApartmentList';
import Registration from './Components/Register/RegistrationForm';
import ChangePassword from './Components/ChangePasswordUser/ChangePassword';

//import ViewListBooking from './Components/DashboardAgency/ViewListBooking';
//import DashboardToolOfAgency from './Components/DashboardAgency/DashboardToolOfAgency';
//import AgencyProfile from './Components/DashboardAgency/AgencyProfile';







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
        <Route path="/distributeapartment" element={<DistributeApartment />} />
        <Route path="/createnewproject" element={<CreateNewProject />} />
        <Route path="/managerdistribute" element={<ManagerDistribute />} />
        <Route path="/managerusers" element={<ManagerUsers />} />
        <Route path="/managerbuildings" element={<Managerbuildings />} />
        <Route path="/editbuilding/:buildingId" element={<EditBuilding />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />

        <Route path="/property/:buildingId" element={<PropertyList />} />
        <Route path="/agency" element={<AgencyListing />} />
        <Route path="/agenciesdetail/:agencyId" element={<AgentsPage />} />
        <Route path="/propertydetail/:apartmentId" element={<PropertyDetail />} />
        <Route path="/editproperty/:apartmentId" element={<EditProperty />} />
        <Route path="/listbooking/:apartmentId" element={<ListBooking />} />
        <Route path="/projectlisting" element={<FeaturedProjects />} />
        <Route path="/buildinglisting" element={<BuildingListing />} />
        <Route path="/postslisting/:projectId" element={<PostsListing />} />
        <Route path="/postdetail/:postId" element={<PostDetail />} />
        <Route path="/managerapartment" element={<ManageApartmentOfInvestor />} />
        

        {/* Post tool box */}
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
        <Route path="/view-post/:postId" element={<ViewPostPage />} />
        <Route path="/createnewpost" element={<CreateNewPost />} />
        <Route path="/managerpost" element={<ManagerPosts />} />
        <Route path="/ReceiveFloorDistribution/:agencyId" element={<ReceiveFloorDistribution />} />
        <Route path="/ManagerListApartmentOfAgency/:agencyId/:buildingId" element={<ManagerListApartmentOfAgency />} />
        <Route path="/edit-apartment/:apartmentId" element={<EditApartmentPage />} />
        <Route path="/viewlistbooking/:apartmentId" element={<ViewListBooking />} />
        <Route path="/dashboard/:agencyId" element={<DashboardToolOfAgency />} />
        <Route path="/agencyprofile/:agencyId" element={<AgencyProfile />} />
        <Route path="/order-history-agency/:agencyId" element={<OrderHistoryOfAgency />} />
        <Route path="/dashboard-customer/:customerId" element={<DashboardCustomer />} />
        <Route path="/order-history-customer/:customerId" element={<OderHistoryOfCustomer />} />
        <Route path="/customer-profile/:customerId" element={<CustomerProfile />} />
        <Route path="/view-booking-of-customer/:customerId" element={<ViewBookingOfCustomer />} />
        <Route path="/view-order-bill-of-agency/:orderId" element={<ViewOrderBillOfAgency />} />
        <Route path="/view-order-bill-of-customer/:orderId" element={<ViewOderBillOfCustomer />} />
        <Route path="/manageapartment" element={<ManageApartmentOfInvestor />} />
        <Route path="/reviewupdatedapartment/:apartmentId" element={<ReviewUpdatedApartment />} />
        <Route path="/confirmbookingManager" element={<ConfirmBookingManager />} />
        <Route path="/confimOderManager" element={<ConfimOderManager />} />
        <Route path="/viewHistoryOrder" element={<ViewHistoryOrder />} />
        <Route path="/change-password/:userID" element={<ChangePassword />} />



        {/* <Route path="/login" element={<Login />} /> */}
        {/* The Route for RealEstateListing should also have a path defined */}
        {/* Define other routes here */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
