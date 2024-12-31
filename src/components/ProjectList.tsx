import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { projects, currentProjectId, createProject, getProjectStats, loadUserProjects } from '../stores/projectStore';
import { CreateProjectModal } from './CreateProjectModal';
import { ProjectCard } from './ProjectCard';

export default function ProjectList() {
  const $projects = useStore(projects);
  const $currentProjectId = useStore(currentProjectId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUserProjects();
  }, []);

  const handleCreateProject = async (name: string, color: string) => {
    try {
      const project = await createProject(name, color);
      if (project) {
        currentProjectId.set(project.id);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      // Opcionalmente mostrar un mensaje de error al usuario
      alert('Error creating project. Please try again.');
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Projects</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          + New Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {$projects.map((project) => {
          const stats = getProjectStats(project.id);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={project.id === $currentProjectId}
              completedTasks={stats.completed}
              totalTasks={stats.total}
              onClick={() => currentProjectId.set(project.id)}
            />
          );
        })}
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}