'use client';

import { Box, Image } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';

const Splash = ({ finishLoading }: { finishLoading: () => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMounted, setIsMounted] = useState(false);
  const ease = 'power2.inOut';
  const animate = () => {
    const timeline = gsap.timeline({ onComplete: () => finishLoading() });

    timeline.to('.splash', {
      duration: 1,
      rotation: 360,
      ease,
    });

    timeline.to('.antiSpin', {
      duration: 1,
      rotation: -360,
      ease,
    });

    // fade out splash div
    timeline.to('.splash', {
      duration: 1,
      opacity: 0,
      ease,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    animate();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <div
        className="splash"
        style={{
          backgroundImage: 'url(/circle.png)',
          width: '200px',
          height: '200px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Image
          className="antiSpin"
          src="/h.png"
          alt="Logo"
          width="200px"
          height="200px"
        />
      </div>
    </Box>
  );
};

export default Splash;
