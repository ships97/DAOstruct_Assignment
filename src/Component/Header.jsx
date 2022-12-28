import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import styles from "../Styles/Header.module.css";

const Header = () => {
  return (
    <>
      <Box className={styles.main}>
          <Box className={styles.first}>
            <Heading className={styles.head1} size={"lg"}>NASA</Heading>
            <Heading className={styles.head2} size={"md"}>Shipra Pal</Heading>
          </Box>
          <Box className={styles.second}>
            <Image className={styles.img} src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" alt="NASA" />
          </Box>
      </Box>
    </>
  )
}

export default Header;
