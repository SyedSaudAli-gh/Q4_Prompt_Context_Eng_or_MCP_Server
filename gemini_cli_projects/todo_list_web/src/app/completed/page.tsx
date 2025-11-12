"use client";

import { useTheme } from "../../lib/context/ThemeContext";
import TaskList from "../../components/TaskList";
import useTasks from "../../lib/hooks/useTasks";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function CompletedTasksPage() {
  const { theme } = useTheme();
  const { tasks, deleteTask, editTask, toggleComplete } = useTasks();

  // Sirf completed tasks filter karo
  const completedTasks = tasks.filter(task => task.completed);
  
  console.log('✅ CompletedTasksPage: All tasks:', tasks);
  console.log('✅ CompletedTasksPage: Completed tasks:', completedTasks);
  console.log('✅ CompletedTasksPage: Completed count:', completedTasks.length);

  return (
    <main className={`min-h-screen ${theme.background} flex flex-col items-center p-4`}>
      <div className="container mx-auto mt-8 max-w-7xl">
        {/* Back button aur Page title */}
        <div className="mb-6">
          <Link href="/">
            <Button 
              variant="ghost" 
              className={`mb-4 ${theme.text} hover:${theme.accent}`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Tasks
            </Button>
          </Link>
          
          <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
            Completed Tasks
          </h1>
          <p className={`${theme.text} opacity-70`}>
            Aapke complete ho chuke tasks yahan hain
          </p>
        </div>

        {/* Completed Tasks List */}
        <TaskList
          tasksToDisplay={completedTasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleComplete={toggleComplete}
        />

        {/* Empty State Message */}
        {completedTasks.length === 0 && (
          <div className="text-center mt-8">
            <p className={`${theme.text} opacity-60 text-lg`}>
              Abhi tak koi task complete nahi hua hai.
            </p>
            <p className={`${theme.text} opacity-60 text-sm mt-2`}>
              Tasks complete karne ke baad wo yahan dikhenge!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}