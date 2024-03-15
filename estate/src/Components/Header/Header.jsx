import { Disclosure, Menu, Transition } from '@headlessui/react';
import axios from 'axios'; // Ensure axios is imported
import { Fragment, useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Project', href: '/projectlisting', current: false },
  { name: 'Agent', href: '/agency', current: false },
  { name: 'About Us', href: '/aboutus', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agencyId, setAgencyId] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('UserData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setIsLoggedIn(true);
      fetchAgencyId(parsedData.data.userId);
    }
  }, []);

  const fetchAgencyId = async (userId) => {
    try {
      console.log("s",userId)
      const response = await axios.get(`https://localhost:7137/api/Agencies/GetAgencyByUserID/${userId}`);
      console.log("s",response.data.agencyId)
      setAgencyId(response.data.agencyId);
    } catch (error) {
      console.error("Failed to fetch agency ID:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('UserData');
    setUserData(null);
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const roleId = userData?.data?.roleId;

  return (
    
    <Disclosure as="nav" className="bg-amber-400 shadow-lg">
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
                        item.current ? ' text-white bg-amber-500' : 'text-amber-800 hover:bg-amber-500 hover:text-white ',
                        'px-5 py-4 rounded-md text-sm font-medium',
                        index !== navigation.length - 1 ? 'mr-10' : '' // Add margin to the right for spacing, except for the last item
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                  {isLoggedIn && (roleId === 'Investor' || roleId === 'Agency') && (
                    <a
                      href={roleId === 'Investor' ? '/investordashboard' : `/dashboard/${agencyId}`}
                      className=" text-amber-800 hover:bg-amber-500 hover:text-white px-5 py-4 rounded-md text-sm font-medium mr-8 " // You might adjust this if you have more items dynamically added
                    >
                      Dashboard
                    </a>
                  )}
                </div>

              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                {isLoggedIn ? (
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="bg-amber-500 p-1 rounded-full text-white hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-amber-50' : '', 'block px-4 py-2 text-sm text-amber-800')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-amber-50' : '', 'block px-4 py-2 text-sm text-amber-800')}
                              onClick={handleSignOut}
                            >
                              Sign out
                            </a>
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

