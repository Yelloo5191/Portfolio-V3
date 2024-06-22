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
// import { isInView } from 'framer-motion';
import NextLink from 'next/link';
import { useRef } from 'react';

// const tempimg = 'https://via.placeholder.com/256';
const ProjectList = [
  {
    name: 'Melo',
    description:
      'A music discovery platform that helps you find new music based on your listening habits.',
    image: 'https://i.imgur.com/m0ykvDs.jpeg',
    href: 'https://melo-plum.vercel.app/',
  },
  {
    name: 'School/Programming Simplified',
    description:
      'Collaborated on creating a website and Discord bot for School Simplified and its CS division, Programming Simplified.',
    image:
      'https://media.licdn.com/dms/image/C4D0BAQFIbgnXrEeM3w/company-logo_200_200/0/1641607280493/school_simplified_logo?e=1724889600&v=beta&t=1w0HgkamnDRvff7BUemsJNjiHiH7nS7jIndl8NZ-geg',
  },
  {
    name: 'Ghastly Dungeons',
    description:
      'A small black and white game for the Black and White Jam #0.(9).',
    image: 'https://img.itch.zone/aW1nLzkzMjI5NTAucG5n/347x500/bgD1nC.png',
    href: 'https://yelloo.itch.io/ghastly-dungeons',
  },
  {
    name: 'Pysweeper',
    description: 'A minesweeper clone made with python and pygame.',
    image: 'https://i.imgur.com/98g6a7X.png',
    href: 'https://github.com/Yelloo5191/Minesweeper',
  },
  {
    name: 'SlugConnect',
    description:
      'CruzHacks 2022 demo project. A social media platform for UCSC students.',
    image: 'https://i.imgur.com/p6A2bsr.png',
    href: 'https://slug-connect.vercel.app/',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatedProjectBox = ({ project, index, colorMode }: any) => {
  const ref = useRef(null);
  //   const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      //   animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <Box className="project">
        <Image
          src={project.image}
          alt={project.name}
          border={5}
          width="auto"
          height="256px"
        />
        <Box
          m={0}
          border={1}
          p={4}
          borderRadius="md"
          borderTopRadius={0}
          borderStyle="solid"
          borderColor={
            colorMode === 'light' ? 'secondary.light' : 'secondary.dark'
          }
          height={48}
        >
          <Heading as="h2" size="md">
            {project.name}
          </Heading>
          <Text>{project.description}</Text>
          {project?.href && (
            <NextLink href={project.href} target="_blank" passHref>
              <Button>View Project</Button>
            </NextLink>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

const Projects = () => {
  const { colorMode } = useColorMode();

  return (
    <Grid textAlign="center" id="projects" minH="100vh" alignContent="center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading as="h1" size="lg" mb={4}>
          behold, my <mark>Creations</mark>
        </Heading>
      </motion.div>

      {/* desktop view */}
      <Grid
        gap={4}
        templateColumns="repeat(3, 1fr)"
        display={{ base: 'none', md: 'grid' }}
      >
        {ProjectList.map((project, index) => (
          <AnimatedProjectBox
            key={project.name}
            project={project}
            index={index}
            colorMode={colorMode}
          />
        ))}
      </Grid>

      {/* mobile view */}
      <Grid
        gap={4}
        templateColumns="repeat(1, 1fr)"
        display={{ base: 'grid', md: 'none' }}
      >
        {ProjectList.map((project, index) => (
          <AnimatedProjectBox
            key={project.name}
            project={project}
            index={index}
            colorMode={colorMode}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Projects;
