'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Project 1',
    description: 'A brief description of Project 1. This project was built using React and Next.js.',
    image: '/images/project1.PNG',
    link: '#',
  },
  {
    title: 'Project 2',
    description: 'A brief description of Project 2. This project was built using Node.js and Express.',
    image: '/images/project2.PNG',
    link: '#',
  },
  {
    title: 'Project 3',
    description: 'A brief description of Project 3. This project was built using TypeScript and Tailwind CSS.',
    image: '/images/project3.PNG',
    link: '#',
  },
];

const ProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Drawer>
              <DrawerTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{project.title}</CardTitle>
                  </CardContent>
                </Card>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{project.title}</DrawerTitle>
                  <DrawerDescription>{project.description}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <img src={project.image} alt={project.title} className="w-full h-64 object-cover mb-4" />
                </div>
                <DrawerFooter>
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
