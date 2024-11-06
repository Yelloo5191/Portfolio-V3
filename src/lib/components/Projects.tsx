'use client';

import {
  Box,
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
    name: 'Here for You',
    description:
      'Worked with a team of students on a platform that connects communities and provides a space for requesting support and resources.',
    image: 'https://i.imgur.com/X7XzTOc.png',
  },
  {
    name: 'Study Buddy',
    description:
      'Developed with a team of students for CalHacks 2024, Study Buddy is a platform designed to easily connect like-minded students in real time to provide a comfortable and productive environment',
    image:
      'https://media.discordapp.net/attachments/1114758944267718749/1303145371559788596/image.png?ex=672ab033&is=67295eb3&hm=11990a537eb22b27f96338c6245a73522e8997215caac8e757dc39bc25f480af&=&format=webp&quality=lossless&width=143&height=174',
    href: 'https://devpost.com/software/studysync-gbo8fx',
  },
  {
    name: 'School/Programming Simplified',
    description:
      'Collaborated on creating a website and Discord bot for School Simplified and its CS division, Programming Simplified.',
    image:
      'https://media.licdn.com/dms/image/v2/C4D0BAQFIbgnXrEeM3w/company-logo_200_200/company-logo_200_200/0/1641607280493/school_simplified_logo?e=2147483647&v=beta&t=UTbwsYE1W0RFRUyYKDkRQyoRCON6c7NzYj3gScfit1c',
  },
  {
    name: 'RetroTekken Fighter',
    description:
      'Mini fighting game with the style of retro fighters made in Python with Pygame.',
    image:
      'https://github.com/Yelloo5191/RetroFighter/blob/master/fighter.png?raw=true',
    href: 'https://github.com/Yelloo5191/RetroFighter',
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
  {
    name: 'Delaygram',
    description:
      "A simple Instagram clone made with Flask and Sqlite for Harvard's CS50 final project.",
    image: 'https://i.imgur.com/9gp2u1f.png',
    href: 'https://github.com/Yelloo5191/Delaygram',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatedProjectBox = ({ project, index, colorMode }: any) => {
  const ref = useRef(null);
  //   const isInView = useInView(ref, { once: true });

  if (project.name === undefined) {
    return <Box />;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      //   animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <NextLink
        href={project?.href ? project.href : ''}
        style={{
          pointerEvents: !project?.href ? 'none' : 'auto',
        }}
        target="_blank"
        passHref
      >
        <Box
          className="project"
          border={1}
          borderStyle="solid"
          borderColor={
            colorMode === 'light' ? 'secondary.light' : 'secondary.dark'
          }
          borderRadius="md"
          overflow="hidden"
          width="100%"
        >
          <Image
            src={project.image}
            alt={project.name}
            border={5}
            width={{ base: '100%', md: '256px' }}
            height={{ base: 'auto', md: '256px' }}
          />
          <Box m={0} p={4} borderTopRadius={0} height={48}>
            <Heading as="h2" size="md">
              {project.name}
            </Heading>
            <Text>{project.description}</Text>
          </Box>
        </Box>
      </NextLink>
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
        templateColumns="repeat(3, 256px)"
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
