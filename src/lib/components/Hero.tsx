'use client';

import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import { TrackballControls, useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { LazyMotion, domAnimation, useInView, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';

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

// const renderModel = (object) => {
//   return object.children.map((child) => {
//     if (child.isMesh) {
//       return (
//         <mesh
//           key={child.uuid}
//           geometry={child.geometry}
//           material={child.material}
//           position={child.position}
//           rotation={child.rotation}
//           scale={[0.5, 0.5, 0.5]}
//         />
//       );
//     }

//     // Recursively render any children the node may have
//     return renderModel(child);
//   });
// };

const MyCube = (
  props?: JSX.IntrinsicAttributes & { object?: object } & {
    [properties: string]: unknown;
  }
) => {
  // Use useGLTF to load the model and animations
  const { scene, animations } = useGLTF('/cube/cube.glb');
  const group = useRef<THREE.Group>();

  // Load animations using useAnimations
  const { actions } = useAnimations(animations, group);

  // Play the animations if they exist
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // iterate over the actions object and play them all
      Object.values(actions).forEach((action) => {
        if (action) {
          action.play();
        }
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('No animations found in the GLTF model.');
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

  const lightRef1 = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  const [count, setCount] = useState(0);
  const [text] = useState(['design.', 'develop.', 'create.']);
  //   const { colorMode } = useColorMode();

  useEffect(() => {
    // move lights up and down
    gsap.to(lightRef1.current?.position ?? {}, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });

    gsap.to(lightRef2.current?.position ?? {}, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });

    // have spotlight orbit around the cube
    gsap.to(spotlightRef.current?.rotation ?? {}, {
      y: Math.PI * 2,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });
  });

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

          <ambientLight intensity={0} color={0xffff00} />
          <pointLight ref={lightRef1} position={[5, -10, 0]} intensity={1000} />
          <pointLight ref={lightRef2} position={[0, 10, -5]} intensity={1000} />
          <spotLight
            position={[5, 5, 5]}
            intensity={1000}
            rotation={[1, 0, 1]}
            ref={spotlightRef}
          />
          <directionalLight
            intensity={500}
            position={[0, 0, 5]}
            rotation={[0, 1, 0]}
          />
          <directionalLight intensity={100} position={[5, 0, 0]} />
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
