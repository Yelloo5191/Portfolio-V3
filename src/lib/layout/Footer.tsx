import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="https://hovhannes.org" isExternal rel="noopener noreferrer">
          hovhannes.org
        </Link>
        {' | '}
        <Link
          href="https://github.com/Yelloo5191"
          isExternal
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        {' | '}
        <Link
          href="https://www.linkedin.com/in/hovhannes-muradyan-ba516b228/"
          isExternal
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
