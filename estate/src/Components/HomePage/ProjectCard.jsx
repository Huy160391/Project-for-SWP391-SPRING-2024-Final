import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg">
      {/* Assuming you have an image for each project. If not, you may want to remove this or handle accordingly */}
      <img className="w-full object-cover h-48" src=''  alt={project.name} />
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-lg mb-2">{project.name}</h3>
    
      </div>
    </div>
  );
};

export default ProjectCard;
