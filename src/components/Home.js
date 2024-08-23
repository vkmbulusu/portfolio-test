import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*');

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(projects);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Hero Section */}
      <div className="text-center my-12">
        <img
          src="https://via.placeholder.com/150"
          alt="Krishna Mohan"
          className="rounded-full mx-auto mb-6 shadow-lg"
          style={{ width: '150px', height: '150px' }}
        />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Krishna Mohan</h1>
        <p className="text-lg text-gray-600">
          Passionate developer with expertise in building dynamic web applications. I specialize in using the latest technologies to create scalable and efficient solutions.
        </p>
      </div>

      {/* Projects Section */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Projects</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <li key={project.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Link to={`/project/${project.id}`} className="text-2xl font-semibold text-blue-600 hover:text-blue-800">
                {project.title}
              </Link>
              <p className="mt-4 text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
