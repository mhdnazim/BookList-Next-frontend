import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <>
    <Box id="banner">
        <Grid container className="container">
          <Grid className="banner">
            <Typography variant="h2">
              About Us
            </Typography>
            <Typography variant="h5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Modi odit incidunt sunt omnis tempora magni ab cumque <br /> consequuntur quia dolorem? Molestias, dolore voluptatem <br /> beatae aperiam reprehenderit error magni cumque recusandae.
            </Typography>
          </Grid>
        </Grid>
    </Box> 
    
    </>
  )
}

export default About