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

const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
];

const mainFeaturedPost = {
  title: "Sri Lanka's Largets Ayurvedic/Herbal medicines and supplements Store",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  // image:
  //   "https://res.cloudinary.com/cake-lounge/image/upload/v1681985800/farmherbs-kajalmela-web-banner_zos46i.jpg",
  image:
    "https://res.cloudinary.com/cake-lounge/image/upload/v1681985807/banner_3_1_pbspna.jpg",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const theme = createTheme();

const UserServiceBaseUrl = process.env.REACT_APP_USER_SERVICE_BASE_URL;

export default function Blog() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    console.log("------------------------------");
    console.log(UserServiceBaseUrl);
    console.log("------------------------------");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        UserServiceBaseUrl + "/user/getAllProducts",
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
        <Header title="Welcome to Herb-City" sections={sections} />

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
              Most Popular Products
            </Typography>
          </Toolbar>

          <Grid container spacing={4}>
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
