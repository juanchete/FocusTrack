import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ColorPicker } from './ColorPicker';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => void;
}

export function CreateProjectModal({ isOpen, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#a855f7');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), color);
      setName('');
      setColor('#a855f7');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101]"
          >
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md pointer-events-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">Create New Project</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter project name..."
                    autoFocus
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Project Color</label>
                  <ColorPicker value={color} onChange={setColor} />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}