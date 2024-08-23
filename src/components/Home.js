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
      console.log('Fetched projects:', projects);  // Log the fetched projects
      setProjects(projects);
    }
  };

  fetchProjects();
}, []);


  return (
    <div className="container mx-auto p-4">
      <div className="text-center my-8">
        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/150"
          alt="Krishna Mohan"
          className="rounded-full mx-auto mb-4"
          style={{ width: '150px', height: '150px' }}
        />
        {/* Introduction */}
        <h1 className="text-4xl font-bold mb-4">Krishna Mohan</h1>
        <p className="text-lg">
          Hello! I'm Krishna Mohan, a passionate developer with expertise in building dynamic web applications. I specialize in using the latest technologies to create scalable and efficient solutions.
        </p>
      </div>
      {/* Project List */}
      <div className="project-list my-8">
        <h2 className="text-2xl font-bold mb-4">My Projects</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border-b pb-4">
              <Link to={`/project/${project.id}`} className="text-blue-500 hover:underline">
                {project.title}
              </Link>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
