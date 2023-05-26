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
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from 'prop-types';
import Check from '@mui/icons-material/Check';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";



const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));


const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon />,
    2: <CheckIcon />,
    3: <RunningWithErrorsIcon />,
    4: <CreditScoreIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

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
  const [stepCount, setStepCount] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null);


  const steps = ['Pending', 'Confirmed', 'Processing','Completed'];


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

  const addFeedback = async (order) =>{

    const _id = order.packageInfo._id;
    const bookingId = order._id;

    if (rating===0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add rating",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    else if (!feedback) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add feedback message",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    else{
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user/feedback/add-feedback-booking",
          {
            _id,
            feedback,
            bookingId,
          },
  
          config
        );
        console.log(data);
        setRating(0);
        setFeedback("")
        Swal.fire({
          icon: "success",
          title: "Feedback Added",
          text: "Your feedback has been added to Service",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Ooops...",
          text: "Your feedback has not added to this service",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        console.log("Error while adding feedback");
        console.log(error.message);
      }
    }

  }
 
  
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

              <Stepper alternativeLabel activeStep={stepCount} connector={<ColorlibConnector />} sx={{mt:10}}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
              </Stepper>

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

                      <ListItem
                        key={currentViewOrder.date}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Date"} />
                        <Typography variant="body2">
                          {currentViewOrder.date}
                        </Typography>
                      </ListItem>

                      <ListItem
                        key={currentViewOrder.packageInfo.guideName}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Guide Name"} />
                        <Typography variant="body2">
                          {currentViewOrder.packageInfo.guideName}
                        </Typography>
                      </ListItem>

                      <ListItem
                        key={currentViewOrder.packageInfo.destination}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Tour Destination"} />
                        <Typography variant="body2">
                          {currentViewOrder.packageInfo.destination}
                        </Typography>
                      </ListItem>
                      
                      <ListItem
                        key={currentViewOrder.packageInfo.accommodations._id}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemIcon>
                        <Avatar
                          alt="Accommodation"
                          src={currentViewOrder.packageInfo.accommodations.profileImage}
                          
                        />
                        </ListItemIcon>
                        
                        <ListItemText primary={"Accommodation"} />
    
                        <Typography variant="body2">
                          {currentViewOrder.packageInfo.accommodations.serviceName}
                        </Typography>

                      </ListItem>

                      <ListItem
                        key={currentViewOrder.packageInfo.accommodations._id}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText primary={"Accommodation Location"} />
                        <Typography variant="body2">
                          {currentViewOrder.packageInfo.accommodations.serviceLocation}
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
                    // onClick={() => deleteOrder(currentViewOrder._id)}
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

        <Container>
          <h5 style={{ textAlign: "left", display: "flex",fontSize:"20px" }}>
              <u>Feedback section</u>
            </h5>
          <List
            sx={{
              width: '100%',
              maxWidth: 560,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {currentViewOrder.packageInfo.feedback.map((rating) => (

                  
                    <ListItem key={`item-${rating}`}>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={rating} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Rating name="read-only" value={3} readOnly />}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            feedback
                          </Typography>
                          {" — "+rating}
                        </React.Fragment>
                      }
                    />
                    
                  </ListItem>
                    </ListItem>

            ))}
          </List>

            <Box
              sx={{
                '& > legend': { mt: 2 },
                textAlign:"left",
                display:"grid"
                
              }}
            >
              <Typography component="legend"><u>Add feedback to product</u></Typography>
              <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              />
            <TextField
              id="standard-multiline-static"
              label="Add Feedback"
              multiline
              rows={2}
              value={feedback}
              variant="standard"
              sx={{width:560}}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button variant="contained" color="secondary" sx={{width:"200px",marginTop:"20px"}} onClick={()=>addFeedback(currentViewOrder)}>
            Submit
          </Button>
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
