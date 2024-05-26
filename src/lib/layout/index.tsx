'use client';

import { Box } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import Splash from '~/lib/components/Splash';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      {isLoading && isHome ? (
        <Splash finishLoading={() => setIsLoading(false)} />
      ) : (
        <Box margin="8">
          <Header />
          <Box as="main" marginY={22}>
            {children}
          </Box>
          <Footer />
        </Box>
      )}
    </Box>
  );
};

export default Layout;
