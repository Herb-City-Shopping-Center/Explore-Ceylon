import { Grid } from '@mui/material'
import React from 'react'
import Feed from '../components/Feed'
import SideMenu from '../components/SideMenu'
import StatusBar from '../components/StatusBar'
import "./HomePage.css"
import Navigation from '../components/Navigation'

const HomePage = () => {

  return (
    <div>
    <Navigation/>
      <Grid container component="main" sx={{ maxHeight: "70vh" }}>
        <Grid item xs={2} sm={2} md={3}>
          <SideMenu data={"home"} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} className="main_content">
          <StatusBar />
          <Feed />
        </Grid>
        <Grid item xs={4} sm={4} md={3} sx={{backgroundColor:'whitesmoke'}}>
          item3
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage