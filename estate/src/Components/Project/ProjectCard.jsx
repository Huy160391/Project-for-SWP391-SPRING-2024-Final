import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="relative bg-white bg-opacity-70  ml-10 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <img
        className="w-full  h-80 object-cover rounded-t-lg"
        src={project.image || "https://vinhomesland.vn/wp-content/uploads/2022/11/phan-khu-the-beverly-solari-vinhomes-grand-park.jpg"}
        alt={project.name}
      />
      {/* Overlay for View Posts */}
      
        <div className="absolute bg-amber-50 bg-opacity-30 top-0 left-0 right-0 bottom-0 flex justify-center items-center text-white text-center">
          <h3 className="text-4xl text-white font-bold mb-2">{project.name}</h3>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-amber-200 bg-opacity-75 text-white text-center">
          <Link
            to={`/postslisting/${project.projectId}`}
            className="text-gray-600 font-bold hover:underline"
          >
            View Posts
          </Link>
        </div>
      </div>
    
  );
};

export default ProjectCard;
