'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md mt-8"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <p className="text-black dark:text-white">&copy; 2025 My Portfolio. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-black dark:text-white hover:text-blue-500">
              <FaGithub size={24} />
            </a>
            <a href="#" className="text-black dark:text-white hover:text-blue-500">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-black dark:text-white hover:text-blue-500">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;