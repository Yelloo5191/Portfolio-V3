import { Flex } from '@chakra-ui/react';

import Hero from '~/lib/components/Hero';
import Projects from '~/lib/components/Projects';
import Skills from '~/lib/components/Skills';

import '../../styles/globals.css';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <Hero />
      <Skills />
      <Projects />
    </Flex>
  );
};

export default Home;
