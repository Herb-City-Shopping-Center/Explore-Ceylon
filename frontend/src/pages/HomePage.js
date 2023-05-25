import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Navigation/Header";
import MainFeaturedPost from "../Client_Components/MainFeaturedPost";
import FeaturedPost from "../Client_Components/FeaturedPost";
import Footer from "../Client_Components/Footer";
import Products from "../Client_Components/GuidePackages";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import Devider from "@mui/material/Divider";

const sections = [
  { title: "Home", url: "/" },
  { title: "Tour Bookings", url: "/bookings" },
  { title: "Hotel Bookings", url: "/hotel-bookings" },
];

const mainFeaturedPost = {
  title: "",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image:
    "https://res.cloudinary.com/cake-lounge/image/upload/v1684346294/sri-lanka-tourism-header-vector-30029652_jzlalk.jpg",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const theme = createTheme();


export default function HomePage() {
  const [hotelServices, setHotelServices] = useState([]);
  const [guidePackages, setGuidePackages] = useState([]);

  const getAllHotelPackages = async () => {
    console.log("------------------------------");
    console.log();
    console.log("------------------------------");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/get-all-hotel-packages",
        {},
        config
      );

      setHotelServices(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getAllGuidePackages = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/get-all-guide-packages",
        {},
        config
      );

      setGuidePackages(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllHotelPackages();
    getAllGuidePackages();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Header title="Welcome to Explore-Ceylon" sections={sections} />

        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Toolbar
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1, fontStyle: "italic" }}
            >
              Our Services
            </Typography>
          </Toolbar>

            <Devider/>
            <h4>Hotel Packages</h4>
          <Grid container spacing={4} sx={{minHeight:"10vh"}}>
            {hotelServices.length>0 ? (
              hotelServices.hotelServices.map((service) => (
                <></>
                // <Products key={service._id} product={service} />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
          <Devider/>
          <h4>Tour Packages</h4>
          <Grid container spacing={4} sx={{minHeight:"10vh"}}>
            {guidePackages.guidePackages ? (
              guidePackages.guidePackages.map((guidePackage) => (
                <Products key={guidePackage._id} service={guidePackage} />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
        </main>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
