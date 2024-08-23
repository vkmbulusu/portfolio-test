import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      let { data: projects, error } = await supabase
        .from('projects')
        .select('*');
      if (error) console.error('Error fetching projects:', error);
      else setProjects(projects);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>My Portfolio</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
