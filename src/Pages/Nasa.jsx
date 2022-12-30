import { Box,Grid,GridItem,Heading,Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Header from "../Component/Header";
import { useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Nasa.module.css';

const Nasa = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-10-01&end_date=2022-10-29&thumbs=true`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <>
      <Box>
        <Header />
        <Box className={styles.main}>
          <Grid className={styles.sub}>
            {data.map((e,i) => {
              return (
                <GridItem className={styles.mid} key={i}>
                  {
                    e.media_type === "image" ? <Image className={styles.imag1} src={e.hdurl} alt="image" /> : <iframe className={styles.imag1} src={e.url} alt="video" />
                  }
                  <Heading size={"md"}>{e.title} , {e.date}</Heading>
                  <Text style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace: "nowrap", width: "350px"}}>{e.explanation}</Text>
                  <Text size={"md"}>Author :- {e.copyright}</Text>
                  <Text>Media-Type :- {e.media_type}</Text>
                </GridItem>
              )
            })}
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Nasa;
