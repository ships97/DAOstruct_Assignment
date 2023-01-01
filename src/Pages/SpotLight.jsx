import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../Styles/Nasa.module.css";

const SpotLight = ({ data }) => {
  // console.log(data);
  return (
    <>
      <Box>
        {Object.keys(data).length > 0 ? (
          data?.media_type === "image" ? (
            <>
            <Box style={{display:"flex",gap:"30px"}}>
              <Box style={{width:"50%",marginLeft:"50px"}}>
                <Heading size={"lg"}>{data.title}</Heading>
                <Text>{data.explanation}</Text>
                <Heading size={"md"}>{data.copyright}</Heading>
              </Box>
              <Box>
                <Image className={styles.imag1} src={data?.hdurl} alt="image" style={{width:"400px",height:"300px"}} />
              </Box>
            </Box> 
            </>
          ) : (
            <>
            <Box style={{display:"flex",gap:"30px"}}>
              <Box style={{width:"50%",marginLeft:"50px"}}>
                <Heading size={"lg"}>{data.title}</Heading>
                <Text>{data.explanation}</Text>
                <Heading size={"md"}>{data.copyright}</Heading>
              </Box>
              <Box>
                <iframe className={styles.imag1} src={data?.url} alt="video" style={{width:"400px",height:"300px"}} />
              </Box>
            </Box>
            </>
          )
        )
         : ("")}
      </Box>
    </>
  );
};

export default SpotLight;
