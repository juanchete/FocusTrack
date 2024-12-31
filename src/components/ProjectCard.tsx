import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../stores/projectStore';

interface Props {
  project: Project;
  isSelected: boolean;
  completedTasks: number;
  totalTasks: number;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, completedTasks, totalTasks, onClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`p-6 rounded-2xl cursor-pointer transition-colors ${
        isSelected ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
      }`}
      style={{
        borderLeft: `4px solid ${project.color}`,
      }}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100}%`,
              backgroundColor: project.color,
            }}
          />
        </div>
        <span className="text-sm text-gray-400">
          {completedTasks}/{totalTasks}
        </span>
      </div>
    </motion.div>
  );
}