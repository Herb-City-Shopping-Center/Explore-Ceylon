import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Navigation/Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const sections = [
  { title: "Home", url: "/" },
  { title: "TourBookings", url: "/bookings" },
  { title: "Hotel Bookings", url: "/hotel-bookings" },
];

const theme = createTheme();

const UserCartServiceBaseUrl = process.env.REACT_APP_USER_CART_SERVICE_BASE_URL;


function ProductView(props) {
  const history = useHistory();
  const data = props.history.location.state?.data? props.history.location.state?.data : props;

  console.log(data);

  const { userId, actor } = useAuth();
  const { user } = useUser();



  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
  const [cartAdded, setCartAdded] = React.useState(false);
  const [wishListAdded, setWishListAdded] = React.useState(
    "Click to add wishlist"
  );

  const checkOut = () => {

      console.log(data);
      history.push({
        pathname: "/package/booking",
        state: {
          data: data,
        },
      });
    
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUpdateFailOpen(false);
    setUpdateOpen(false);
  };

  const addWishlist = async () => {
    // setProductId(data._id);
    // setProductImage(data.pic);
    // setProductPrice(data.price);
    // setProductTitle(data.productTitle);
    // setCustomerId(user ? userId : null);
    // setQuantity(quantity);
    // setShopId(data.shopId);

    // if (
    //   !productImage ||
    //   !productTitle ||
    //   !productPrice ||
    //   !productId ||
    //   !shopId ||
    //   !customerId ||
    //   !quantity
    // ) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Please enter quantity",
    //     footer: '<a href="">Why do I have this issue?</a>',
    //   });
    // } else {
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     };
    //     const { data } = await axios.post(
    //       UserCartServiceBaseUrl + "/cart/addCart",
    //       {
    //         productId,
    //         productImage,
    //         productPrice,
    //         productTitle,
    //         customerId,
    //         shopId,
    //         quantity,
    //       },
    //       config
    //     );
    //     console.log(data);
    //     setUpdateOpen(true);
    //     setCartAdded(true);
    //     setWishListAdded("Added to wishlist");
    //   } catch (error) {
    //     console.log(error.response.data.error);
    //     setUpdateFailOpen(true);
    //     setCartAdded(false);
    //   }
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Header title="Welcome to Explore-Ceylon" sections={sections} />

        <Grid
          container
          component="main"
          sx={{ maxHeight: "70vh", marginTop: "20px" }}
        >
          <Grid item md={5}>
            <Avatar
              src={data.displayPic ? data.displayPic : null}
              sx={{ width: "400px", height: "400px", marginLeft: "30px" }}
              variant="square"
            ></Avatar>
          </Grid>

          <Grid item md={7}>
            <h3 style={{ textAlign: "left", display: "flex" }}>
              {data.packageTitle}
            </h3>

            <h5 style={{ textAlign: "left", display: "flex" }}>
              <u>Description</u>
            </h5>

            <p style={{ display: "flex" }}>{data.description}</p>

            <h5 style={{ textAlign: "left", display: "flex" }}>
              MRP : {data.budget}.00 lkr
            </h5>
            <h5 style={{ textAlign: "left", display: "flex" }}>
              Duration : {data.numberOfDays} days
            </h5>
            <h5 style={{ textAlign: "left", display: "flex" }}>
              Destination : {data.destination}
            </h5>
            <h5 style={{ textAlign: "left", display: "flex" }}>
              Maximum Members : {data.numberOfPeoples} persons
            </h5>
            <h5 style={{ textAlign: "left", display: "flex" }}>
              Vehicle Type : {data.vehicleType}
            </h5>
            <h5 style={{ textAlign: "left", display: "flex" }}>
              Accomodation :  <a href="#">{data.accommodations.serviceName} {data.accommodations.serviceLocation}</a>
            </h5>

            <Grid container spacing={2} sx={{ marginTop: "80px" }}>
              <Snackbar
                open={updateOpen}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="success"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  Added to cart
                </Alert>
              </Snackbar>

              <Snackbar
                open={updateFailOpen}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="error"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  Failed to adding cart
                </Alert>
              </Snackbar>
              <Grid item xs={6}>
                <Tooltip title="Book package" placement="top-end">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={checkOut}
                    sx={{ width: "100%" }}
                  >
                    Get Explore
                    <LocalMallIcon />
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item xs={6}>
                <Tooltip title={wishListAdded} placement="top-end">
                  <IconButton aria-label="add to favorites">
                    {cartAdded ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteIcon onClick={addWishlist} />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Footer/>
    </ThemeProvider>
  );
}

export default ProductView;
