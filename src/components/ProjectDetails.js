import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching project:', error);
      } else {
        setProject(project);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Project Title and Info */}
        <header className="border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600 mt-2">{project.technologies}</p>
          <div className="flex space-x-4 mt-4">
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Live Demo
              </a>
            )}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub Repo
              </a>
            )}
          </div>
        </header>

        {/* Project Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-700 text-lg">{project.description}</p>
        </section>

        {/* Project Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Feature 1: Detailed description of this feature.</li>
            <li>Feature 2: Detailed description of this feature.</li>
            <li>Feature 3: Detailed description of this feature.</li>
            {/* Add more features as needed */}
          </ul>
        </section>

        {/* Screenshots or Media (Optional) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <img src="https://via.placeholder.com/400" alt="Screenshot 1" className="rounded-lg shadow-md" />
            <img src="https://via.placeholder.com/400" alt="Screenshot 2" className="rounded-lg shadow-md" />
            <img src="https://via.placeholder.com/400" alt="Screenshot 3" className="rounded-lg shadow-md" />
            {/* Add more screenshots or media as needed */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProjectDetails;
