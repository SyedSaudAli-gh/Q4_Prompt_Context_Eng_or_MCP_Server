"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../lib/types';
import { Button } from './ui/button';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useTheme } from '../lib/context/ThemeContext';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete, toggleComplete }: TaskCardProps) => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  // Client-side rendering ke liye (hydration mismatch avoid karne ke liye)
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Date ko readable format mein convert karna
  const formatTimestamp = (date: Date) => {
    try {
      const dateObj = new Date(date);
      
      // Check karo ke valid date hai ya nahi
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }

      return dateObj.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('❌ TaskCard: Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  // Debug log
  console.log('🃏 TaskCard rendering task:', task);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      whileHover={{ scale: 1.03, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative p-6 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg ${theme.secondary} bg-opacity-60 border border-opacity-20 border-gray-300 overflow-hidden`}
    >
      {/* Background decoration */}
      <div
        className={`absolute inset-0 ${theme.background} opacity-20 rounded-xl`}
        style={{ zIndex: -1 }}
      />
      
      {/* Header: Title aur Action buttons */}
      <div className="flex justify-between items-start mb-4">
        <h3
          className={`text-xl font-semibold ${theme.text} ${
            task.completed ? 'line-through opacity-70' : ''
          } break-words pr-2`}
        >
          {task.title}
        </h3>
        
        {/* Action buttons */}
        <div className="flex space-x-2 flex-shrink-0">
          {/* Edit button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className={`${theme.text} hover:text-blue-500 transition-colors`}
            title="Edit task"
          >
            <Pencil className="h-5 w-5" />
          </Button>
          
          {/* Delete button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className={`${theme.text} hover:text-red-500 transition-colors`}
            title="Delete task"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
          
          {/* Toggle complete button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleComplete(task.id)}
            className={`${theme.text} transition-colors`}
            title={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed ? (
              <X className="h-5 w-5 text-red-400" />
            ) : (
              <Check className="h-5 w-5 text-green-400" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Footer: Creation timestamp */}
      <p className={`text-sm ${theme.text} opacity-80`}>
        Created: {isClient ? formatTimestamp(task.createdAt) : 'Loading...'}
      </p>
    </motion.div>
  );
};

export default TaskCard;