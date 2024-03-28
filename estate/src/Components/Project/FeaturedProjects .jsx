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



  const filteredProjects = projects.filter(project => {
    return project.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (

    <section className="py-0 h-full font-serif" style={{ backgroundImage: `url('https://vinhome.com.vn/wp-content/uploads/2023/02/the-beverly-1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh' }}>
      <div className=" mx-auto  bg-amber-100 bg-opacity-90 py-4 h-full w-full">
        <h2 className="text-4xl font-bold text-amber-600 text-center mt-4 mb-6">Featured Projects</h2>
        <div className="flex justify-center mb-10">
          <div className="relative w-3/4">

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
