import { Box, Flex } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      position="fixed"
      top={0}
      left={0}
      zIndex={1}
      p={4}
    >
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
