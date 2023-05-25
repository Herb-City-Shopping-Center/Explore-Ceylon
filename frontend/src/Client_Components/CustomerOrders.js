import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Navigation/Header";
import MainFeaturedPost from "../Client_Components/MainFeaturedPost";
import FeaturedPost from "../Client_Components/FeaturedPost";
import Footer from "../Client_Components/Footer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import axios from "axios";
import { useEffect } from "react";
import { UserButton, useUser, useSignUp, useAuth } from "@clerk/clerk-react";
import Swal from "sweetalert2";


const columns = [
  { id: "fname", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "selectedCity",
    label: "Pickup City",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "customerPhone",
    label: "Contact No",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const sections = [
  { title: "Home", url: "/" },
  { title: "Tour Bookings", url: "/bookings" },
  { title: "Hotel Bookings", url: "/hotel-bookings" },
];

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const theme = createTheme();
const UserServiceBaseUrl = process.env.REACT_APP_USER_SERVICE_BASE_URL;

function CustomerOrders() {
  const { userId } = useAuth();

  const [page, setPage] = React.useState(0);
  const [deleteOrderId, setDeleteOrderId] = React.useState(null);
  const [viewOrderStatus, setViewOrderStatus] = React.useState(false);
  const [currentViewOrder, setCurrentViewOrder] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bookings, setBookings] = React.useState([]);
  const [orderStatus, setOrderStatus] = React.useState(false);



  const getBookingsByUserId = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/getBookingsByUserId",
        { userId },
        config
      );

      setBookings(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getBookingsByUserId();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewOrder = (order) => {
    setViewOrderStatus(true);
    setCurrentViewOrder(order);
    if (order.orderStatus === "Completed") {
      setOrderStatus(true);
    }
  };

  const closeOrder = () => {
    setViewOrderStatus(false);
    setCurrentViewOrder(null);
  };

  const deleteOrder = async (orderId) => {
    if (!orderId) {
      alert("No id");
    } else {
       console.log("----------------------------");
       console.log(orderId);
       console.log("----------------------------");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          UserServiceBaseUrl + "/user/deleteOrder",
          { orderId },
          config
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Order has been deleted",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        setDeleteOrderId(null);
        closeOrder();
        console.log(data);
        getBookingsByUserId();
      } catch (error) {
        setDeleteOrderId(null);
        console.log(error.response.data.error);
      }
    }
  };
  
  if (viewOrderStatus) {

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>
          <Header title="Welcome to Herb-City" sections={sections} />

          <Box sx={{ maxWidth: "50%", marginTop: "50px", marginLeft: "200px" }}>
            <Tooltip title="Close" placement="top-end">
              <IconButton sx={{ marginLeft: "35vw" }} onClick={closeOrder}>
                <ClearIcon sx={{ display: "flex" }} />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>
            <Avatar
              src={currentViewOrder.packageInfo.displayPic ? currentViewOrder.packageInfo.displayPic : null}
              sx={{ width: "300px", height: "300px", marginLeft: "140px" }}
              variant="square"
            ></Avatar>

            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                      {currentViewOrder.packageInfo.packageTitle}
                    </Typography>
                    <List disablePadding>
                      <ListItem
                        key={currentViewOrder.packageInfo.budget}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Unit Price"} />

                        <Typography variant="body2">
                          {currentViewOrder.packageInfo.budget + ".00 lkr"}
                        </Typography>
                      </ListItem>

                      <ListItem
                        key={currentViewOrder.packageInfo.budget}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Number of days"} />

                        <Typography variant="body2">
                          {currentViewOrder.packageInfo.numberOfDays}
                        </Typography>
                      </ListItem>
                      <ListItem
                        key={currentViewOrder.packageInfo.budget}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Order Status"} />
                        <Typography variant="body2">
                          {currentViewOrder.orderStatus}
                        </Typography>
                      </ListItem>
                    </List>
                  
                    {/* <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                          Shipping
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.fname +
                            " " +
                            currentViewOrder.checkoutDetails.lname}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.addressLine1}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.addressLine2}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.city}
                        </Typography>
                        <Typography gutterBottom>
                          {currentViewOrder.checkoutDetails.state}
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </Grid>
                {orderStatus ? (
                  <Typography
                    gutterBottom
                    onClick={() => deleteOrder(currentViewOrder._id)}
                  >
                    <a href="#">
                      <u>Delete Booking</u>
                    </a>
                  </Typography>
                ) : (
                  <div></div>
                )}
              </React.Fragment>
            </Paper>
          </Box>
          
        </Container>

        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    );
  } else if (!bookings.bookings) {
    return <div>Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container>
          <Header title="Welcome to Explore-Ceylon" sections={sections} />

          <h4>My Bookings</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.bookings.map((booking) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={booking._id}
                        onClick={() => viewOrder(booking)}
                      >
                        {columns.map((column) => {
                          const value = booking[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {isValidUrl(value) ? (
                                <Avatar
                                  variant="square"
                                  src={value}
                                  sx={{ width: "80px", height: "80px" }}
                                ></Avatar>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={bookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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

export default CustomerOrders;
