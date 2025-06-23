import { useEffect, useState } from "react";
import axios from "../api/axios";

interface Project {
  id?: number;
  title: string;
  description: string;
  status: "Completed" | "Ongoing" | "Planned";
  budget: string;
  date: string;
  category: string;
  image_url?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Health", "Education", "Economic Empowerment", "Social Inclusion & Equity", "Peacebuilding & Security", "Active Citizenship", "Environment"];
  
  const statusColors = {
    "Completed": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Ongoing": "bg-blue-100 text-blue-800 border-blue-200",
    "Planned": "bg-amber-100 text-amber-800 border-amber-200"
  };

  const statusIcons = {
    "Completed": "✓",
    "Ongoing": "⏳",
    "Planned": "📋"
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/projects/");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Barangay Projects
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover ongoing and completed projects that make a difference in our community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-emerald-600">
              {projects.filter(p => p.status === "Completed").length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">
              {projects.filter(p => p.status === "Ongoing").length}
            </div>
            <div className="text-gray-600">Ongoing</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-amber-600">
              {projects.filter(p => p.status === "Planned").length}
            </div>
            <div className="text-gray-600">Planned</div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
            <p className="text-gray-500 text-lg">
              {filter === "All" ? "No projects available at the moment." : `No projects found in the ${filter} category.`}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {project.image_url ? (
                  <div className="h-56 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
                    <img
                      src={`https://skgomez.onrender.com/uploads/${project.image_url}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[project.status]} backdrop-blur-sm`}>
                        {statusIcons[project.status]} {project.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[project.status]}`}>
                        {statusIcons[project.status]} {project.status}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{project.title}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="flex items-center text-green-600 font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Budget: {project.budget}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(project.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-transparent bg-opacity-100 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                {selectedProject.image_url && (
                  <div className="h-64 md:h-80 bg-gradient-to-br from-blue-100 to-green-100 relative">
                    <img
                      src={`https://skgomez.onrender.com/uploads/${selectedProject.image_url}`}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 right-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusColors[selectedProject.status]} backdrop-blur-sm`}>
                        {statusIcons[selectedProject.status]} {selectedProject.status}
                      </span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={closeProjectModal}
                  className="absolute top-6 left-6 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedProject.title}</h2>
                  <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{selectedProject.budget}</div>
                    <div className="text-gray-600 font-medium">Project Budget</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${
                      selectedProject.status === 'Completed' ? 'text-emerald-600' :
                      selectedProject.status === 'Ongoing' ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {statusIcons[selectedProject.status]} {selectedProject.status}
                    </div>
                    <div className="text-gray-600 font-medium">Current Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-1">
                      {new Date(selectedProject.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-gray-600 font-medium">Project Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;