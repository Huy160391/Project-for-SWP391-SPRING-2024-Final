import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../HomePage/ProjectCard'; // Make sure the name matches the actual component file

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Projects</h2>
        {/* Adjusted the grid to lg:grid-cols-4 for 4 cards in a row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.projectId} project={project} /> // Make sure your key is unique and the props match your ProjectCard component's expected props
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
