import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../Navigation/Header";
import Footer from "./../Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";


const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const theme = createTheme();

const sections = [
  { title: "Home", url: "/" },
  { title: "Tour Bookings", url: "/bookings" },
  { title: "Hotel Bookings", url: "/hotel-bookings" },
];

export default function Review(props) {


  const { userId, actor } = useAuth();
  const [addressInfo, setAddressInfo] = useState();
  const [itemsInfo, setItemsInfo] = useState();
  const [total, setTotal] = useState();
  const [packageInfo, setPackageInfo] = useState();

  useEffect(() => {
    // setItemsInfo(JSON.parse(localStorage.getItem("bookingInfo")));
    setAddressInfo(JSON.parse(localStorage.getItem("bookingInfo")));
    setPackageInfo(JSON.parse(localStorage.getItem("packageInfo")));

  }, [])

    
  
  if (!addressInfo && !itemsInfo) {
    return <h3>Loading...</h3>;
  } else {
  

    const MakeOrder = async (url) => {


      if (!packageInfo) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Null Object of package info",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } else {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/user/placeOrder",
            {
              addressInfo,
              packageInfo,
            },
            config
          );
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Thank you for Exploring Sri Lanka",
            text: "Booking confirmed",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = "http://localhost:3000/";
            }
          });
        } catch (error) {
          console.log(error.response.data.error);

          Swal.fire({
            icon: "error",
            title: "Failed to booking",
            text: error.response.data.error,
          });
        }
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>
          <Header title="Explore-Ceylon Checkout" sections={sections} />
        </Container>

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Confirm Booking
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom>
                    Booking summary
                  </Typography>
                  <List disablePadding>

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText
                          primary={
                            packageInfo.packageTitle.length <= 35
                              ? packageInfo.packageTitle
                              : packageInfo.packageTitle.substr(0, 19) + "..."
                          }
                          secondary={
                            "Destination : " + packageInfo.destination
                          }
                        />
                        <Typography variant="body2">
                          {packageInfo.budget + ".00 lkr"}
                        </Typography>
                      </ListItem>

                  
                  </List>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Thank you
                      </Typography>
                      {/* <Typography gutterBottom>
                        {itemsInfo[0].checkoutDetails.fname +
                          " " +
                          itemsInfo[0].checkoutDetails.lname}
                      </Typography>
                      <Typography gutterBottom>
                        {itemsInfo[0].checkoutDetails.addressLine1}
                      </Typography>
                      <Typography gutterBottom>
                        {itemsInfo[0].checkoutDetails.addressLine2}
                      </Typography>
                      <Typography gutterBottom>
                        {itemsInfo[0].checkoutDetails.city}
                      </Typography>
                      <Typography gutterBottom>
                        {itemsInfo[0].checkoutDetails.state}
                      </Typography> */}
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                      </Typography>
                      <Grid container>
                        {payments.map((payment) => (
                          <React.Fragment key={payment.name}>
                            <Grid item xs={6}>
                              <Typography gutterBottom>
                                {payment.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography gutterBottom>
                                {payment.detail}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button sx={{ mt: 3, ml: 1 }}>Back</Button>

                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={MakeOrder}
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
        </Container>

        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    );
  }
}
