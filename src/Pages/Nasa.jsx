import { Box,Grid,GridItem,Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Header from "../Component/Header";
import { useState } from 'react';
import axios from 'axios';

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
        <Box>
          <Grid>
            {data.map((e,i) => {
              return (
                <GridItem key={i}>
                  <Image src={e.url} alt="image" />
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
