// src/components/Projects.tsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import type { Project } from "../types";

const categories = [
  "health",
  "education",
  "economic empowerment",
  "social inclusion and equity",
  "peacebuilding and security",
  "active citizenship",
  "environment",
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <section className="p-8 bg-white text-black" id="projects">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {categories.map((cat) => {
        const filtered = projects.filter((p) => p.category === cat);
        if (filtered.length === 0) return null;

        return (
          <div key={cat} className="mb-6">
            <h3 className="text-xl font-semibold capitalize mb-2">{cat}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((p) => (
                <div key={p.id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-bold">{p.title}</h4>
                  <p className="text-sm text-gray-700">{p.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{p.date}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Projects;
