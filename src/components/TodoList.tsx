import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentProjectId, todos, toggleTodo, completionAnimationShown, markAnimationAsShown } from '../stores/projectStore';
import DancingBear from './DancingBear';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoList() {
  const $currentProjectId = useStore(currentProjectId);
  const $todos = useStore(todos);
  const $completionAnimationShown = useStore(completionAnimationShown);
  const [showAnimation, setShowAnimation] = useState(false);

  const projectTodos = $currentProjectId 
    ? $todos.filter(todo => todo.projectId === $currentProjectId)
    : [];
    
  const allCompleted = projectTodos.length > 0 && projectTodos.every(todo => todo.completed);
  
  useEffect(() => {
    if (allCompleted && $currentProjectId && !$completionAnimationShown[$currentProjectId]) {
      setShowAnimation(true);
    }
  }, [allCompleted, $currentProjectId, $completionAnimationShown]);

  const handleClose = () => {
    if ($currentProjectId) {
      markAnimationAsShown($currentProjectId);
      setShowAnimation(false);
    }
  };

  if (!$currentProjectId) {
    return null;
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 cursor-pointer"
            onClick={handleClose}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <DancingBear onClose={handleClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Tasks</h2>
          <span className="text-gray-400">
            {projectTodos.filter(t => t.completed).length}/{projectTodos.length} completed
          </span>
        </div>
        <AnimatePresence>
          {projectTodos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-lg transition-colors ${
                todo.completed ? 'bg-green-500/20' : ''
              }`}
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded-full border-2 border-purple-500 text-purple-500 focus:ring-purple-500"
                />
                <span className={`ml-3 text-white ${todo.completed ? 'line-through opacity-50' : ''}`}>
                  {todo.text}
                </span>
              </label>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}