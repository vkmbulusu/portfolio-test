import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      let { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching project:', error);
      else setProject(project);
    };
    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p><strong>Technologies:</strong> {project.technologies}</p>
      <p><a href={project.demo_link} target="_blank" rel="noopener noreferrer">Live Demo</a></p>
      <p><a href={project.github_link} target="_blank" rel="noopener noreferrer">GitHub Repo</a></p>
    </div>
  );
}

export default ProjectDetails;
