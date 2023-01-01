import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "../Component/Header";
import { useState } from "react";
import axios from "axios";
import styles from "../Styles/Nasa.module.css";
import SpotLight from "./SpotLight";

const Nasa = () => {
  const [data, setData] = useState([]);
  const [spotLightData, setSpotLightData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleMainData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-10-01&end_date=2022-10-29&thumbs=true`
      );
      setError(false);
      setData(res.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMainData();
  }, []);

  const handleSpotLightData = (index) => {
    setSpotLightData(data[index]);
  };

  return (
    <>
      <Box>
        <Header />
        <Box className={styles.main}>
          <SpotLight data={spotLightData} /> 
        </Box>
        <Box>
          {!error ? (
            <Grid
              className={styles.sub}
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(7, 1fr)",
              ]}
            >
              {loading
                ? new Array(7).fill(0).map((e, i) => (
                    <GridItem className={styles.mid} key={i}>
                      <Stack>
                        <Skeleton height="300px" bg={"grey"} />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                      </Stack>
                    </GridItem>
                  ))
                : data?.map((e, i) => {
                    return (
                      <GridItem className={styles.mid} key={i} onClick={() => handleSpotLightData(i)}>
                        {e.media_type === "image" ? (
                          <Image
                            className={styles.imag1}
                            src={e.hdurl}
                            alt="image"
                          />
                        ) : (
                          <iframe
                            className={styles.imag1}
                            src={e.url}
                            alt="video"
                          />
                        )}
                        <Heading size={"md"}>
                          {e.title} , {e.date}
                        </Heading>
                        {/* <Text style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace: "nowrap", width: "350px"}}>{e.explanation}</Text> */}
                        <Text size={"md"}>
                          {e.copyright && `Author :- ${e.copyright}`}
                        </Text>
                        {/* <Text>Media-Type :- {e.media_type}</Text> */}
                      </GridItem>
                    );
                  })}
            </Grid>
          ) : (
            <Box>Something went wrong ...</Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Nasa;
