import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Project', href: '/projectlisting', current: false },
  { name: 'Agence', href: '/agency', current: false },
  { name: 'About Us', href: '/aboutus', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agencyId, setAgencyId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [userID, setUserId] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('UserData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setIsLoggedIn(true);
      fetchUserId(parsedData.data.userId);
      fetchAgencyId(parsedData.data.userId);
      fetchCustomerId(parsedData.data.userId);// Ensure this userId is correct
    }
  }, []);
  const fetchUserId = async (userId) => {
    setUserId(userId);
  };

  const fetchAgencyId = async (userId) => {
    try {

      const agencyResponse = await axios.get(`https://localhost:7137/api/Agencies/GetAgencyByUserID/${userId}`);
      if (agencyResponse.data) {
        setAgencyId(agencyResponse.data.agencyId);
      }

    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchCustomerId = async (userId) => {
    try {
      const customerResponse = await axios.get(`https://localhost:7137/api/Customers/GetCustomerByUserID/${userId}`);
      if (customerResponse.data) {
        setCustomerId(customerResponse.data.customerId); // Correctly setting customerId based on API response
      }


    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };


  const handleSignOut = () => {
    localStorage.removeItem('UserData');
    setUserData(null);
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const getAvatarUrl = () => {
    switch (userData?.data?.roleId) {
      case 'Investor':
        return "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-94.jpg"; // Default avatar for Investors
      case 'Agency':
        return `https://localhost:7137/api/Agencies/GetImage/${agencyId}`; // Avatar URL for Agency
      case 'Customer':
        return `https://localhost:7137/api/Customers/GetImage/${customerId}`; // Avatar URL for Customer
      default:
        return "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-94.jpg"; // Fallback avatar
    }
  };
  const roleId = userData?.data?.roleId;

  return (
    <Disclosure as="nav" className="bg-amber-400 shadow-lg font-serif">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-14 w-16"
                    src="https://img.upanh.tv/2024/03/12/Screenshot-2024-03-12-192604-fotor-20240312193025.png"
                    alt="Your Company"
                  />
                </div>
                <div className="ml-1 hidden md:block">
                  {navigation.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'text-white bg-amber-500' : 'text-amber-800 hover:bg-amber-500 hover:text-white',
                        'px-5 py-4 rounded-md text-sm font-medium',
                        index !== navigation.length - 1 ? 'mr-10' : ''
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                  {isLoggedIn && (['Investor', 'Agency', 'Customer'].includes(roleId)) && (
                    <a
                      href={
                        roleId === 'Investor' ? '/investordashboard' :
                          roleId === 'Agency' ? `/dashboard/${agencyId}` :
                            `/dashboard-customer/${customerId}` // This will correctly direct customers to their dashboard
                      }
                      className="text-amber-800 hover:bg-amber-500 hover:text-white px-5 py-4 rounded-md text-sm font-medium mr-8 transition-colors duration-200 ease-in-out"
                    >
                      Dashboard
                    </a>
                  )}
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                {isLoggedIn ? (
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="bg-amber-600 p-1 rounded-full text-white hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={getAvatarUrl()} // Dynamically set the avatar URL
                        alt="User"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-50 flex-shrink-0 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to={`/change-password/${userID}`} className={classNames(active ? 'bg-amber-50' : '', 'block w-full text-left px-4 py-2 text-sm text-amber-800')}>
                              Change Password
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={classNames(active ? 'bg-amber-50' : '', 'block w-full text-left px-4 py-2 text-sm text-amber-800')} onClick={handleSignOut}>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>

                    </Transition>

                  </Menu>
                ) : (
                  <a
                    href="/login"
                    className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded transition ease-in-out duration-300"
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
