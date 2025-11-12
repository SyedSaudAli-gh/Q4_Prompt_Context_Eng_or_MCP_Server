'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative h-screen">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: '#000000',
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="/images/profile.jpeg"
            alt="Profile"
            className="rounded-full w-48 h-48 object-cover mx-auto border-4 border-white shadow-lg"
          />
        </motion.div>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-4 text-black"
        >
          <TypeAnimation
            sequence={[
              'Hello, I\'m John Doe',
              1000,
              'I\'m a Full-Stack Developer',
              1000,
              'I love building web applications',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex space-x-4 mb-8"
        >
          <Button asChild>
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact Me</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex space-x-4"
        >
          <a href="#" className="text-black hover:text-blue-400">
            <FaGithub size={32} />
          </a>
          <a href="#" className="text-black hover:text-blue-400">
            <FaLinkedin size={32} />
          </a>
          <a href="#" className="text-black hover:text-blue-400">
            <FaTwitter size={32} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;