import React from 'react';
import { Link } from 'react-router-dom';
const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg">
      {/* Assuming you have an image for each project. If not, you may want to remove this or handle accordingly */}
      <img className="w-full object-cover h-48" src="https://vinhomesland.vn/wp-content/uploads/2022/11/phan-khu-the-beverly-solari-vinhomes-grand-park.jpg"  alt={project.name} />
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-lg mb-2">{project.name}</h3>
        <Link to={`/postslisting/${project.projectId}`} className="btn">
        View Posts
      </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
