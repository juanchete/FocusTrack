import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentProjectId, addTask } from '../stores/projectStore';
import { motion } from 'framer-motion';

export default function TodoInput() {
  const [task, setTask] = useState('');
  const $currentProjectId = useStore(currentProjectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() && $currentProjectId) {
      addTask($currentProjectId, task);
      setTask('');
    }
  };

  if (!$currentProjectId) {
    return null;
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mb-8"
    >
      <div className="flex gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 p-4 bg-white/10 border border-white/20 rounded-2xl shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          Add Task
        </motion.button>
      </div>
    </motion.form>
  );
}