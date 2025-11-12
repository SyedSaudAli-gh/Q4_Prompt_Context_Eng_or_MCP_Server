'use client';

import { motion } from 'framer-motion';
import { FaUser, FaCode, FaRocket } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-black rounded-lg shadow-lg p-8"
        >
          <FaUser className="text-5xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Who I Am</h2>
          <p className="text-gray-600 dark:text-gray-300">
            I am a passionate and creative full-stack developer with a love for building beautiful and functional web applications.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-black rounded-lg shadow-lg p-8"
        >
          <FaCode className="text-5xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">What I Do</h2>
          <p className="text-gray-600 dark:text-gray-300">
            I have experience with a variety of technologies, including React, Next.js, Node.js, and more. I enjoy turning complex problems into simple, beautiful, and intuitive designs.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-black rounded-lg shadow-lg p-8"
        >
          <FaRocket className="text-5xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">What I Love</h2>
          <p className="text-gray-600 dark:text-gray-300">
            I am always looking for new challenges and opportunities to learn and grow as a developer. I am excited to see what the future holds and what I can create next.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;