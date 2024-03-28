// Import các dependencies
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Component HomePageDecoration2
const HomePageDecoration3 = () => {
    // Render component
    return (
        <section className="py-48 bg-amber-100  bg-opacity-50 relative grid grid-cols-1 sm:grid-cols-2 font-serif">

            <div class="ml-10 mr-10">
                <div class="intro">
                    <div class="relative">
                        <h4 class="title text-4xl font-script text-justify">
                            Register for a tour of Vinhomes projects and model apartments</h4>
                        <h4 class="absolute title text-4xl font-script text-justify" style={{ top: -1, left: 1, zIndex: 1 }}>
                            Register for a tour of Vinhomes projects and model apartments</h4>
                    </div>

                    <ul class="list-unstyled  list-amber-200 font-script mt-10">
                        <li className="mt-4 text-justify">To provide our valued customers with a visual, authentic, and diverse perspective on Vinhomes projects, we invite you to register for a tour of our projects and model apartments here.</li>
                        
                    </ul>
                </div>
                <Link
                                            to={`/projectlisting`}
                                            className="h-30 w-30 text-amber-500 text-xl absolute font-bold hover:underline mt-5"
                                        >
                                            View Project
                                        </Link>
            </div>
            <div className="container mx-auto relative">
                <img
                    alt="reason-image-1"
                    src="https://www.ecostructures.com.au/wp-content/uploads/2023/09/glamping-vs-camping-1320x881-1.jpeg"
                    className="w-4/5 h-auto top-0 left-0 ml-16 object-cover rounded-lg -mt-3"
                />
                
            </div>
        </section>






    );
};

export default HomePageDecoration3;
