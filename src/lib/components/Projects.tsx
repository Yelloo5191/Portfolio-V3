'use client';

import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef } from 'react';

const tempimg = 'https://via.placeholder.com/256';
const ProjectList = [
  {
    name: 'Sextuplets',
    description: '6 people',
    image: tempimg,
  },
  {
    name: 'Octuplets',
    description: '8 people',
    image: tempimg,
  },
  {
    name: 'Decuplets',
    description: '10 people',
    image: tempimg,
  },
  {
    name: 'Sextuplets',
    description: '6 people',
    image: tempimg,
  },
  {
    name: 'Octuplets',
    description: '8 people',
    image: tempimg,
  },
  {
    name: 'Decuplets',
    description: '10 people',
    image: tempimg,
  },
];

const Projects = () => {
  const { colorMode } = useColorMode();
  const projectsRef: React.MutableRefObject<HTMLDivElement[]> = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.project',
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
    });

    projectsRef.current.forEach((project, index) => {
      const animation = gsap.fromTo(
        project,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power1.inOut',
        }
      );

      ScrollTrigger.create({
        trigger: project,
        start: 'top bottom-=100',
        onEnter: () => {
          animation.play();
        },
      });

      tl.add(animation, index * 0.2);
    });

    // Custom scroll event listener to control animation speed
    const handleScroll = () => {
      const scrollVelocity = Math.abs(window.scrollY - tl.time()) * 0.1;
      tl.timeScale(Math.min(1, scrollVelocity));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Grid textAlign="center" id="projects">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading as="h1" size="lg" mb={4}>
          behold, my <mark>Creations</mark>
        </Heading>
      </motion.div>

      <Grid gap={4} templateColumns="repeat(3, 1fr)">
        {ProjectList.map((project, index) => (
          <Box
            key={project.name}
            ref={(el: HTMLDivElement) => {
              projectsRef.current[index] = el;
            }}
            className="project"
          >
            <Image src={project.image} alt={project.name} border={5} />
            <Box
              m={0}
              border={1}
              p={4}
              borderRadius="md"
              borderStyle="solid"
              borderColor={
                colorMode === 'light' ? 'secondary.light' : 'secondary.dark'
              }
              width={64}
              height={32}
            >
              <Heading as="h2" size="md">
                {project.name}
              </Heading>
              <Text>{project.description}</Text>
              <Button>View Project</Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default Projects;
