"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/context/ThemeContext';
import TaskCard from './TaskCard';
import EditTaskDialog from './EditTaskDialog';
import DeleteDialog from './DeleteDialog';
import { Task } from '../lib/types';

interface TaskListProps {
  tasksToDisplay: Task[];
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  toggleComplete: (id: string) => void;
}

const TaskList = ({ tasksToDisplay, deleteTask, editTask, toggleComplete }: TaskListProps) => {
  const { theme } = useTheme();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  console.log('📋 TaskList: Rendering with tasks:', tasksToDisplay);

  const handleEditClick = (task: Task) => {
    console.log('✏️ Edit clicked:', task);
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    console.log('🗑️ Delete clicked:', id);
    const task = tasksToDisplay.find(t => t.id === id);
    setSelectedTask(task || null);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      console.log('🗑️ Confirming delete:', selectedTask.id);
      deleteTask(selectedTask.id);
      setIsDeleteDialogOpen(false);
      setSelectedTask(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      {/* Header with task count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${theme.text}`}>
          Tasks
        </h2>
        <motion.span 
          key={tasksToDisplay.length} // ⭐ Key change hone par animate hoga
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`px-4 py-2 rounded-full ${theme.accent} text-white text-sm font-semibold shadow-lg`}
        >
          {tasksToDisplay.length} {tasksToDisplay.length === 1 ? 'Task' : 'Tasks'}
        </motion.span>
      </div>

      {/* Tasks Grid or Empty State */}
      <AnimatePresence mode="wait">
        {tasksToDisplay.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`text-center p-12 rounded-xl ${theme.secondary} shadow-lg`}
          >
            <div className="mx-auto h-32 w-32 mb-6 opacity-50">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className={theme.text}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11l3 3L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={`text-2xl font-semibold ${theme.text} mb-2`}>
              Koi task nahi hai
            </p>
            <p className={`text-sm ${theme.text} opacity-60`}>
              Naya task add karke shuru karein!
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="tasks-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {tasksToDisplay.map((task) => (
                <motion.div 
                  key={task.id} 
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    toggleComplete={toggleComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogs */}
      <EditTaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        editTask={editTask}
      />
      
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedTask(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default TaskList;