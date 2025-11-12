"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from "sonner";
import { useTheme } from '../lib/context/ThemeContext';

interface TaskInputProps {
  addTask: (title: string) => void;
}

const TaskInput = ({ addTask }: TaskInputProps) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleAddTask = async () => {
    console.log('📝 TaskInput: Add button clicked, title:', taskTitle);
    
    // Validation
    if (!taskTitle.trim()) {
      toast.error('Task title khali nahi ho sakti!');
      return;
    }

    setIsLoading(true);
    
    try {
      // ⭐ Pehle task add karo
      console.log('➕ Calling addTask...');
      addTask(taskTitle.trim());
      
      // Input field clear karo
      setTaskTitle('');
      
      // Success message
      toast.success('Task successfully add ho gayi! ✅');
      console.log('✅ Task added and input cleared');
      
    } catch (error) {
      console.error('❌ Error adding task:', error);
      toast.error('Task add karne mein error!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && taskTitle.trim()) {
      handleAddTask();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-lg ${theme.secondary} flex flex-col sm:flex-row gap-3`}
    >
      <Input
        type="text"
        placeholder="Naya task add karein... (Enter press karein)"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className={`grow ${theme.background} ${theme.text} border-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-base`}
        autoFocus
      />
      
      <Button
        onClick={handleAddTask}
        disabled={isLoading || !taskTitle.trim()}
        className={`${theme.accent} text-white px-6 py-2 min-w-[120px] font-semibold`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Adding...</span>
          </div>
        ) : (
          '+ Add Task'
        )}
      </Button>
    </motion.div>
  );
};

export default TaskInput;