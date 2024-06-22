'use client';

import {
  Box,
  Heading,
  Text,
  useColorMode,
  VStack,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaReact,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaJsSquare,
  FaJava,
} from 'react-icons/fa';
import { PiFileCppFill, PiFileCFill } from 'react-icons/pi';
import {
  SiDjango,
  SiTypescript,
  SiNextdotjs,
  SiChakraui,
} from 'react-icons/si';

const skillsList = [
  { name: 'JavaScript', icon: FaJsSquare },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: FaPython },
  { name: 'C++', icon: PiFileCppFill },
  { name: 'C', icon: PiFileCFill },
  { name: 'Java', icon: FaJava },
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Chakra UI', icon: SiChakraui },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Django', icon: SiDjango },
  { name: 'Git', icon: FaGitAlt },
  { name: 'SQL', icon: FaDatabase },
  { name: 'HTML/CSS', icon: FaCode },
];

const Skills = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      textAlign="center"
      alignContent="center"
      id="skills"
      minH="100vh"
      p={8}
    >
      <VStack spacing={8}>
        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading mb={4}>
            About <mark>Me</mark>
          </Heading>
          <Text fontSize="lg" maxW="3xl" mx="auto">
            Hello, I&apos;m Hovhannes, a passionate developer with a love for
            creating dynamic and interactive applications. My journey in the
            tech world has equipped me with a diverse skill set and a constant
            drive to learn and grow. Let&apos;s work together and build a better
            tomorrow.
          </Text>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading mb={4}>
            My <mark>Skills</mark>
          </Heading>
          <Flex wrap="wrap" justify="center">
            {skillsList.map((skill, index) => (
              <motion.div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box
                  bg={colorMode === 'light' ? 'white' : 'gray.700'}
                  p={4}
                  m={2}
                  borderRadius="md"
                  boxShadow="md"
                  width="120px"
                >
                  <Icon
                    as={skill.icon}
                    w={12}
                    h={12}
                    mb={2}
                    color={
                      colorMode === 'light'
                        ? 'secondary.light'
                        : 'secondary.dark'
                    }
                  />
                  <Text>{skill.name}</Text>
                </Box>
              </motion.div>
            ))}
          </Flex>
        </motion.div>
      </VStack>
    </Box>
  );
};

export default Skills;
