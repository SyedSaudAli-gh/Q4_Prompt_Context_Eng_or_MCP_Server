"use client";

import { useState, useEffect } from 'react';
import { Task } from '../types';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ PEHLE: localStorage se tasks LOAD karo (sirf ek baar)
  useEffect(() => {
    console.log('🔄 useTasks: Loading tasks from localStorage...');
    
    try {
      const storedTasks = localStorage.getItem('tasks');
      
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        const tasksWithDates = parsedTasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
        
        setTasks(tasksWithDates);
        console.log('✅ Tasks loaded successfully:', tasksWithDates);
      } else {
        console.log('📭 No tasks found in localStorage');
        setTasks([]); // Explicitly set empty array
      }
    } catch (error) {
      console.error('❌ Error loading tasks:', error);
      setTasks([]);
    }
    
    // ⭐ Loading complete - ab save karne ki permission
    setIsLoaded(true);
  }, []); // Empty dependency = sirf ek baar run hoga

  // ✅ BAAD MEIN: Tasks change hone par localStorage mein SAVE karo
  // Lekin SIRF jab initial load complete ho chuki ho
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Saving tasks to localStorage:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]); // tasks ya isLoaded change hone par

  // ➕ Naya task ADD karna
  const addTask = (title: string) => {
    console.log('➕ Adding task:', title);
    
    if (!title || !title.trim()) {
      console.warn('⚠️ Empty title, aborting');
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    console.log('✅ New task created:', newTask);

    // ⭐ State update - yeh immediately UI update karega
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log('📋 Updated tasks array:', updatedTasks);
      return updatedTasks;
    });
  };

  // 🗑️ Task DELETE karna
  const deleteTask = (id: string) => {
    console.log('🗑️ Deleting task:', id);
    
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      console.log('📋 Tasks after delete:', updatedTasks);
      return updatedTasks;
    });
  };

  // ✏️ Task EDIT karna
  const editTask = (id: string, newTitle: string) => {
    console.log('✏️ Editing task:', id, 'New title:', newTitle);
    
    if (!newTitle || !newTitle.trim()) {
      console.warn('⚠️ Empty title, aborting edit');
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      );
      console.log('📋 Tasks after edit:', updatedTasks);
      return updatedTasks;
    });
  };

  // ✓ Task completion TOGGLE karna
  const toggleComplete = (id: string) => {
    console.log('✓ Toggling completion for task:', id);
    
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      console.log('📋 Tasks after toggle:', updatedTasks);
      return updatedTasks;
    });
  };

  return { tasks, addTask, deleteTask, editTask, toggleComplete };
};

export default useTasks;