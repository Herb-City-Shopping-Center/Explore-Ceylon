import React from 'react'
import { Grid } from "@mui/material";
import Profile from '../components/Profile';
import './ProfilePage.css'

export default function ProfilePage() {
  return (
    <div>
      <Grid container component="main" sx={{ maxHeight: "70vh" }}>
        
        <Grid item xs={12} sm={12} md={12} className='profilepage_profilesection'>
          <Profile />
        </Grid>

      </Grid>
    </div>
  );
}
