import { Flex } from '@chakra-ui/react';

import CTASection from '~/lib/components/samples/CTASection';
import Hero from '~/lib/components/samples/Hero';
import SomeImage from '~/lib/components/samples/SomeImage';

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
      <SomeImage />
      <CTASection />
    </Flex>
  );
};

export default Home;
