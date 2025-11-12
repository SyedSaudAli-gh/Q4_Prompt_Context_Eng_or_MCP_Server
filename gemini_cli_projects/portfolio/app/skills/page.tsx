'use client';

import { motion } from 'framer-motion';
import { FaReact, FaJs, FaNodeJs, FaDatabase, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const skills = [
  { name: 'React', level: 90, icon: <FaReact /> },
  { name: 'Next.js', level: 85, icon: <FaReact /> },
  { name: 'JavaScript', level: 90, icon: <FaJs /> },
  { name: 'TypeScript', level: 80, icon: <FaJs /> },
  { name: 'Node.js', level: 75, icon: <FaNodeJs /> },
  { name: 'SQLite', level: 70, icon: <FaDatabase /> },
  { name: 'Tailwind CSS', level: 95, icon: <FaCss3Alt /> },
  { name: 'HTML5', level: 98, icon: <FaHtml5 /> },
];

const SkillsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white dark:bg-black rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="text-3xl text-blue-500 mr-4">{skill.icon}</div>
              <h2 className="text-xl font-semibold text-black dark:text-white">{skill.name}</h2>
            </div>
            <div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4"
              data-tooltip-id="skill-tooltip"
              data-tooltip-content={`${skill.level}%`}
            >
              <motion.div
                className="bg-blue-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
      <Tooltip id="skill-tooltip" />
    </motion.div>
  );
};

export default SkillsPage;