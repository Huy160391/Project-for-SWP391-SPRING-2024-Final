import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DashboardCustomer = () => {
    const { customerId } = useParams();
    const dashboardItems = [
        { name: 'View Your Booking', path: `/view-booking-of-customer/${customerId}` },
        { name: 'Your Profile', path: `/customer-profile/${customerId}` },
        { name: 'Order View', path: `/order-history-customer/${customerId}` },
        // Add more customer-specific functionalities as needed
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 h-max bg-gray-50 rounded-lg shadow-lg w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Customer Dashboard</h2>
                <div className="grid grid-cols-2 gap-6 p-4">
                    {dashboardItems.map((item, index) => (
                        <Link to={item.path} key={index}
                            className="flex items-center justify-center h-48 bg-gradient-to-r from-blue-500 to-blue-700 
                             text-white text-xl font-semibold rounded-lg shadow-md 
                             hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-1 hover:scale-105 
                             transition duration-300 ease-in-out">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardCustomer;
