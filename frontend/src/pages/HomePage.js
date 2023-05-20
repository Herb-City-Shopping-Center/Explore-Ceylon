import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Navigation/Header";
import MainFeaturedPost from "../Client_Components/MainFeaturedPost";
import FeaturedPost from "../Client_Components/FeaturedPost";
import Footer from "../Client_Components/Footer";
import Products from "../Client_Components/Products";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import Devider from "@mui/material/Divider";

const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
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


export default function Blog() {
  const [products, setProducts] = useState([]);

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
        "/api/user/getAllHotelPackages",
        {},
        config
      );

      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

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
          <Grid container spacing={4} sx={{minHeight:"10vh"}}>
            {products.Products ? (
              products.Products.map((product) => (
                <Products key={product.productTitle} product={product} />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
          <Devider/>
          <Grid container spacing={4} sx={{minHeight:"10vh"}}>
            {products.Products ? (
              products.Products.map((product) => (
                <Products key={product.productTitle} product={product} />
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
