'use client';

import { Box, Button, Grid, Heading, Text } from '@chakra-ui/react';
import { TrackballControls, AsciiRenderer } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { LazyMotion, domAnimation, useInView, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';

extend({ TrackballControls });

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

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
        transition: 'opacity 0.8s ease, transform 0.5s ease',
      }}
    >
      {firstWord} {restWords}
    </span>
  );
}

const MyTorus = () => {
  const torusRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      castShadow
      ref={torusRef}
    >
      <torusGeometry args={[5, 2, 30, 200]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);
  const [text] = useState(['design.', 'develop.', 'create.']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % text.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <Grid
      textAlign="center"
      height="100vh"
      alignContent="center"
      userSelect="none"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Canvas
          shadows
          camera={{
            position: [-6, 7, 7],
          }}
          style={{
            height: '50vh',
            marginBottom: '2rem',
            width: '100%',
            color: 'red',
          }}
        >
          <AsciiRenderer />
          <TrackballControls />

          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={4} />
          <MyTorus />
        </Canvas>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Heading as="h1" size="lg">
          Hi I&apos;m <mark>Hovhannes</mark>, a <mark>software engineer</mark>.
        </Heading>
      </motion.div>

      <Box justifySelf={isInView ? 'left' : 'center'}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <Text
            ref={ref}
            className="text-[17px] md:text-2xl"
            style={{
              opacity: isInView ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          >
            I{' '}
            <LazyMotion features={domAnimation}>
              <TextElement key={count} element={text[count]} />
            </LazyMotion>
          </Text>
        </motion.div>
      </Box>

      <Box
        mt={4}
        justifySelf={isInView ? 'left' : 'center'}
        className="hero-button"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 4 }}
        >
          <Button
            size="lg"
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: '#projects',
                // ease: 'power2.inOut',
              });
            }}
          >
            My Creations
          </Button>
        </motion.div>
      </Box>
    </Grid>
  );
};

export default Hero;
