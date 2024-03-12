import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <img
        className="w-full object-cover h-48"
        src={project.image || "https://vinhomesland.vn/wp-content/uploads/2022/11/phan-khu-the-beverly-solari-vinhomes-grand-park.jpg"}
        alt={project.name}
      />
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-xl mb-2">{project.name}</h3>
        <Link
          to={`/postslisting/${project.projectId}`}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
        >
          View Posts
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
