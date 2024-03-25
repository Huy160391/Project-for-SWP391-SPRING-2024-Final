import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard'; // Make sure the name matches the actual component file

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/Projects');
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter(project => {
    return project.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Projects</h2>
        <div className="flex justify-center mb-10">
          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-full pr-10 focus:outline-none"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-5.2-5.2M11 15c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))
          ) : (
            <div>No projects found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
