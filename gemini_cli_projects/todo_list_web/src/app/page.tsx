"use client";

import { useTheme } from "../lib/context/ThemeContext";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import useTasks from "../lib/hooks/useTasks";

export default function Home() {
  const { theme } = useTheme();
  const { tasks, addTask, deleteTask, editTask, toggleComplete } = useTasks();

  // ⭐ SIRF ACTIVE (incomplete) tasks dikhao
  // Completed tasks "Completed Tasks" page pe jayengi
  const activeTasks = tasks.filter(task => !task.completed);

  // Debug logs
  console.log('🏠 Home: All tasks:', tasks);
  console.log('🏠 Home: Active tasks (not completed):', activeTasks);
  console.log('🏠 Home: Active tasks count:', activeTasks.length);

  return (
    <main className={`min-h-screen ${theme.background} flex flex-col items-center p-4`}>
      <div className="container mx-auto mt-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
            My Tasks
          </h1>
          <p className={`${theme.text} opacity-70`}>
            Apne pending tasks ko manage karein
          </p>
        </div>

        {/* Task Input Form */}
        <TaskInput addTask={addTask} />
        
        {/* Active Tasks List */}
        <div className="mt-8">
          <TaskList
            tasksToDisplay={activeTasks}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleComplete={toggleComplete}
          />
        </div>

        {/* Stats */}
        <div className="mt-6 flex justify-center gap-4">
          <div className={`px-4 py-2 rounded-lg ${theme.secondary} ${theme.text}`}>
            <span className="font-semibold">{activeTasks.length}</span> Active
          </div>
          <div className={`px-4 py-2 rounded-lg ${theme.secondary} ${theme.text}`}>
            <span className="font-semibold">{tasks.filter(t => t.completed).length}</span> Completed
          </div>
          <div className={`px-4 py-2 rounded-lg ${theme.secondary} ${theme.text}`}>
            <span className="font-semibold">{tasks.length}</span> Total
          </div>
        </div>
      </div>
    </main>
  );
}