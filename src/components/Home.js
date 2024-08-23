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
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Krishna Mohan</h1>
          <p className="text-gray-600">Full Stack Developer | Web Applications Specialist</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar (Profile Summary) */}
        <aside className="lg:col-span-1 bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Krishna Mohan"
              className="rounded-full mx-auto mb-4"
              style={{ width: '150px', height: '150px' }}
            />
            <h2 className="text-xl font-semibold text-gray-900">Krishna Mohan</h2>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <ul className="mt-2 text-gray-600">
              <li>Email: krishna@example.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Location: Hyderabad, India</li>
            </ul>
          </div>
        </aside>

        {/* Main Content (Experience & Projects) */}
        <section className="lg:col-span-2 space-y-6">
          {/* Experience Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Technical Business Analyst</h4>
                <p className="text-gray-600">RealPage Inc. | 2022 - Present</p>
                <p className="text-gray-600 mt-2">Focused on AI-based Optical Character Recognition (OCR) for Invoice Processing and sustainability initiatives.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">IT Director</h4>
                <p className="text-gray-600">iConcept MD Contact Solutions Corp. | 2017 - 2022</p>
                <p className="text-gray-600 mt-2">Led projects like Transport Management System, Helpdesk Ticketing System, and cloud migration.</p>
              </div>
              {/* Add more experience as needed */}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Projects</h3>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="border-b pb-4">
                  <Link to={`/project/${project.id}`} className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                    {project.title}
                  </Link>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
