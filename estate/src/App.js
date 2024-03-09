import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AgencyListing from './Components/Agency/AgencyListing';
import ListApartmentbyAgency from './Components/Agency/ListApartmentbyAgency';
import AgencyDetail from './Components/AgencyDetail/AgencyDetail';
import AddNewAgency from './Components/DashboardInvestor/AddNewAgency';
import CreateNewProject from './Components/DashboardInvestor/CreateNewBuilding';
import InvestorDashboard from './Components/DashboardInvestor/DashboardInvestor';
import DistributeApartment from './Components/DashboardInvestor/DistributeApartment';
import DistributeFloor from './Components/DashboardInvestor/DistributeFloor';
import ListDistributeAgency from './Components/DashboardInvestor/ListDistributeAgency';
import Managerbuildings from './Components/DashboardInvestor/ManagerBuilding';
import ManagerDistribute from './Components/DashboardInvestor/ManagerDistribute';
import ManagerTransaction from './Components/DashboardInvestor/ManagerTransaction';
import ManagerUsers from './Components/DashboardInvestor/ManagerUsers';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
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
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addnewagency" element={<AddNewAgency/>} />
        <Route path="/distributefloor" element={<DistributeFloor/>} />
        <Route path="/distributeapartment" element={<DistributeApartment/>} />
        <Route path="/createnewproject" element={<CreateNewProject />} />
        <Route path="/managerdistribute" element={<ManagerDistribute />} />
        <Route path="/listdistributeagency" element={<ListDistributeAgency/>} />
        <Route path="/managerusers" element={<ManagerUsers />} />
        <Route path="/managerbuildings" element={<Managerbuildings />} />
        <Route path="/managertransaction" element={<ManagerTransaction />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
        <Route path="/realestatelisting" element={<RealEstateListing />} />
        <Route path="/realestate/:buildingId" element={<RealEstateDetail />} />
        <Route path="/property" element={<PropertyList />} />
        <Route path="/agency" element={<AgencyListing />} />
        <Route path="/agencydetail" element={<AgencyDetail />} />
        <Route path="/propertydetail/:apartmentId" element={<PropertyDetail />} />
        <Route path="/editproperty/:apartmentId" element={<EditProperty />} />
        <Route path="/propertylistbyAgency" element={<ListApartmentbyAgency />} />

        {/* <Route path="/login" element={<Login />} /> */}
        {/* The Route for RealEstateListing should also have a path defined */}
        {/* Define other routes here */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
