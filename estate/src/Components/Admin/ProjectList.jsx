import React from 'react';
const ProjectList = () => {
  // Dummy data for the list
  const projects = [
    { id: 1, title: 'Addodle', description: 'Lorem ipsum dolor sit amet...' },
    // ... more projects
  ];

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div className="project-card" key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button>Dang bán</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
