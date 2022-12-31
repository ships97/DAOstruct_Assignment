import { Box, Image } from "@chakra-ui/react";
import React from "react";
import styles from "../Styles/Nasa.module.css";

const SpotLight = ({ data }) => {
  // console.log(data);
  return (
    <>
      <Box>
        {Object.keys(data).length > 0 ? (
          data?.media_type === "image" ? (
            <Image className={styles.imag1} src={data?.hdurl} alt="image" />
          ) : (
            <iframe className={styles.imag1} src={data?.url} alt="video" />
          )
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default SpotLight;
