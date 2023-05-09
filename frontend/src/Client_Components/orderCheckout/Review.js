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
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
];

export default function Review(props) {


  const { userId, actor } = useAuth();
  const [addressInfo, setAddressInfo] = useState();
  const [itemsInfo, setItemsInfo] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setItemsInfo(JSON.parse(localStorage.getItem("itemsInfo")));
    setAddressInfo(JSON.parse(localStorage.getItem("addressInfo")));

  }, [])

    
  
  if (!addressInfo && !itemsInfo) {
    return <h3>Loading...</h3>;
  } else {
    // console.log(addressInfo);
    // console.log(itemsInfo);

    for (let i = 0; i < itemsInfo.length; i++) {
      itemsInfo[i].checkoutDetails = addressInfo;

      if(!itemsInfo[i].customerId){
         itemsInfo[i].customerId =userId;
      }
      // itemsInfo[i].orderTotal = itemsInfo[i].quantity * itemsInfo[i].productPrice;
    }
    console.log("Finallllllllllllllllllllllllllllll");
    console.log(itemsInfo);

    const MakeOrder = async (url) => {


      if (!itemsInfo) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Null Object",
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
            "http://localhost:5000/api/user/placeOrder",
            {
              itemsInfo,
            },
            config
          );
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Thank you for shopping with Herb-City",
            text: "Order confirmed",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = "http://localhost:3000/";
            }
          });
        } catch (error) {
          console.log(error.response.data.error);

          Swal.fire({
            icon: "error",
            title: "Failed to placing orderrrr",
            text: error.response.data.error,
          });
        }
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>
          <Header title="Herb-City Checkout" sections={sections} />
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
                Confirm Order
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom>
                    Order summary
                  </Typography>
                  <List disablePadding>
                    {itemsInfo.map((item) => (
                      <ListItem key={item.productTitle} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                          primary={
                            item.productTitle.length <= 35
                              ? item.productTitle
                              : item.productTitle.substr(0, 19) + "..."
                          }
                          secondary={
                            "Ship  by : " + item.checkoutDetails.deliverMethod
                          }
                        />
                        <Typography variant="body2">
                          {item.orderTotal + ".00 lkr"}
                        </Typography>
                      </ListItem>
                    ))}

                    {/* <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary="Total" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      </Typography>
                    </ListItem> */}
                  </List>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                      </Typography>
                      <Typography gutterBottom>
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
                      </Typography>
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
