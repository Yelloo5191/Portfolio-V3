'use client';

import { Box, Button, Grid, Heading, Text } from '@chakra-ui/react';
import { LazyMotion, domAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function TextElement({ element }: { element: string }) {
  const firstWord = <mark>{element.split(' ')[0]}</mark>;
  const restWords = element.split(' ').slice(1).join(' ');
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  return (
    <span
      ref={ref}
      className="text-[17px] md:text-2xl inline-block"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : 'scale(0.8)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {firstWord} {restWords}
    </span>
  );
}

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);
  const [text] = useState(['design.', 'develop.', 'create.']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % text.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        Hi I&apos;m <mark>Hovhannes</mark>, a <mark>software engineer</mark>.
      </Heading>

      <Text
        ref={ref}
        className="text-[17px] md:text-2xl"
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
        justifySelf={isInView ? 'left' : 'center'}
      >
        I{' '}
        <LazyMotion features={domAnimation}>
          <TextElement key={count} element={text[count]} />
        </LazyMotion>
      </Text>

      <Box justifySelf="left" mt={4}>
        <Link href="#projects" passHref>
          <Button size="lg">My Creations</Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default Hero;
