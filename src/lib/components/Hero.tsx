'use client';

import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import {
  TrackballControls,
  useGLTF,
  useTexture,
  useAnimations,
} from '@react-three/drei';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { LazyMotion, domAnimation, useInView, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';

let GLTFLoader;

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

const renderModel = (object) => {
  return object.children.map((child) => {
    if (child.isMesh) {
      return (
        <mesh
          key={child.uuid}
          geometry={child.geometry}
          material={child.material}
          position={child.position}
          rotation={child.rotation}
          scale={[0.5, 0.5, 0.5]}
        />
      );
    }

    // Recursively render any children the node may have
    return renderModel(child);
  });
};

const MyCube = (props) => {
  // Use useGLTF to load the model and animations
  const { scene, animations } = useGLTF('/cube/cube.glb');

  // Load animations using useAnimations
  const { actions } = useAnimations(animations);
  console.log(animations);

  const group = useRef<THREE.Group>();

  // Play the first animation if it exists
  useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  // Add rotation animation to the group
  useFrame(() => {
    if (group.current) {
      group.current.rotation.x += 0.005;
      group.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);
  const [text] = useState(['design.', 'develop.', 'create.']);
  //   const { colorMode } = useColorMode();

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
            position: [-8, -8, -8],
          }}
          style={{
            height: '50vh',
            marginBottom: '2rem',
            width: '100%',
          }}
        >
          {/* {colorMode === 'light' ? (
            <AsciiRenderer bgColor="white" fgColor="black" invert={false} />
          ) : (
            <AsciiRenderer bgColor="#1a202c" fgColor="white" invert={false} />
          )} */}

          <TrackballControls />

          <ambientLight intensity={100} />
          <pointLight
            position={[0, 0, 0]}
            intensity={10}
            rotation={[1, 0, 0]}
          />
          <pointLight
            position={[10, 10, 10]}
            intensity={10}
            rotation={[1, 0, 0]}
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={10}
            rotation={[1, 0, 0]}
          />
          <pointLight
            position={[-10, -10, 10]}
            intensity={10}
            rotation={[0, 1, 0]}
          />
          <pointLight
            position={[10, -10, -10]}
            intensity={10}
            rotation={[0, 1, 0]}
          />
          <pointLight
            position={[10, -10, 10]}
            intensity={10}
            rotation={[0, 0, 1]}
          />
          <MyCube />
        </Canvas>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Heading as="h1" size="lg" textAlign="left">
          Hi I&apos;m <mark>Hovhannes</mark>, a <mark>software engineer</mark>.
        </Heading>
      </motion.div>

      <Box justifySelf={isInView ? 'left' : 'center'}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <Heading
            ref={ref}
            fontSize="5xl"
            style={{
              opacity: isInView ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          >
            I{' '}
            <LazyMotion features={domAnimation}>
              <TextElement key={count} element={text[count]} />
            </LazyMotion>
          </Heading>
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
          transition={{ delay: 1, duration: 4 }}
        >
          <Button
            size="lg"
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: '#skills',
                // ease: 'power2.inOut',
              });
            }}
          >
            But who am I?
          </Button>
        </motion.div>
      </Box>
    </Grid>
  );
};

export default Hero;
