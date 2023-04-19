import { Avatar } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import './Profile.css'
import SettingsIcon from "@mui/icons-material/Settings";
import Button  from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

function Profile() {

    const [spacing, setSpacing] = React.useState(2);
    const [postList, setPostList] = React.useState();

  return (
    <div className="profile_main">
      <Grid container component="main" sx={{ maxHeight: "70vh" }}>
        <Grid item xs={2} sm={2} md={4}>
          <Box
            sx={{
              width: "100%",
              marginTop: "50px",
              border: "none",
              marginLeft: "150px",
            }}
          >
            <Avatar
              src="https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png"
              alt="profile"
              sx={{ width: "150px", height: "150px", marginTop: 12, marginLeft:8 }}
            />
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={8} sx={{marginLeft:'-80px'}}>
          <div className="profilepage_username">User_Name</div>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            sx={{ marginTop: "-50px" }}
          >
            Edit profile
          </Button>

          <div className="analytics">
            <div className="post_count">83 Posts</div>
            <div className="followers_count">640 Followers</div>
            <div className="following_count">235 Following</div>
          </div>
          <br></br>

          <div className="profile_details">
            <div className="profilepage_name">
              <p>Profile name</p>
            </div>
            <div className="about">
              <p>About SriLankan 22 yars buddhist</p>
            </div>
          </div>
        </Grid>
      </Grid>

      <Divider variant="middle" sx={{ marginTop: 10 }} />
      <br></br>

      <Grid item xs={12} className="post_section">
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <Grid key={value} item>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg"
                  alt="Paella dish"
                />

                <Divider variant="middle" />
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid><br></br><br></br>
    </div>
  );
}

export default Profile;
