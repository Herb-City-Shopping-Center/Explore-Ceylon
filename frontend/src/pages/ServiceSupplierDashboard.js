import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import validator from "validator";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import ReCAPTCHA from "react-google-recaptcha";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { mainListItems } from "../Guide_Components/listItems";

import Chart from "../Guide_Components/Chart";
import Deposits from "../Guide_Components/Deposits";
import Orders from "../Guide_Components/Packages";
import { UserButton, useUser, useSignUp, useAuth } from "@clerk/clerk-react";
import RecentOrders from "../Guide_Components/RecentOrders";
import Autocomplete from "@mui/material/Autocomplete";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();
const theme = createTheme();

const BASE_URL = process.env.BASE_URL;

function DashboardContent(props) {
  const { serviceAccount } = props;

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { user } = useUser();
  const { userId, actor } = useAuth();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <UserButton />
            {user ? <h3> Hello, {user.firstName}!</h3> : null}
            {/* {actor && <span>user {actor.sub} has </span>} logged in as user
            {userId} */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Guide Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <RecentOrders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function ServiceRegisterForm() {

  const serviceTypes = [
    { label: "Guide Service", code: "0" },
    { label: "Hotel Services", code: "1" },
  ];

  const history = useHistory();
  const { user } = useUser();
  const { userId, actor } = useAuth();

  const [open, setOpen] = useState(false);

  const [serviceName, setServiceName] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [serviceLocation, setServiceLocation] = useState();
  const [profileImage, setProfileImage] = useState();
  const [serviceType, setServiceType] = useState();
  const [serviceCode, setServiceCode] = useState();
  const [contact, setContact] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const postDetails = (profileImage) => {
    if (profileImage === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (profileImage.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", profileImage);

      data.append("upload_preset", "userImages");

      data.append("cloud_name", "cake-lounge");

      fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setProfileImage(data.url.toString());

          profileImage = data.url.toString();
          //console.log(data.url.toString());
          console.log(profileImage);
        })
        .catch((err) => {
          console.log(err);
          //setPicLoading(false);
        });
    } else {
      console.log("Plese upload an image!!!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var isSuccess = true;

    if (!serviceName) {
      Swal.fire({
        title: "Error!",
        text: "Please enter service name !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }

    if (!serviceDescription) {
      Swal.fire({
        title: "Error!",
        text: "Please enter Service Description !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }
    if (!serviceLocation) {
      Swal.fire({
        title: "Error!",
        text: "Please enter Shop Address !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }
    if (!profileImage) {
      Swal.fire({
        title: "Error!",
        text: "Please enter Shop Image !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }
    if (!serviceType) {
      Swal.fire({
        title: "Error!",
        text: "Please enter service type !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }
    if (!contact) {
      Swal.fire({
        title: "Error!",
        text: "Please enter contact number !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }
    if (!serviceCode) {
      Swal.fire({
        title: "Error!",
        text: "Please enter service code !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }

    if (isSuccess) {
      setServiceCode(Number(serviceType.code))
      console.log(BASE_URL);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/service/register-service",
          {
            userId,
            serviceName,
            serviceDescription,
            serviceLocation,
            contact,
            serviceType,
            serviceCode,
            profileImage,
          },

          config
        );
        console.log(data);

        localStorage.setItem("shopInfo", JSON.stringify(data));

        Swal.fire({
          title: "success",
          text: "Registration Success",
          icon: "success",
          confirmButtonText: "Close",
        });
        history.push("/guide/dashboard");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
          footer: '<a href="">Why do I have this issue?</a>',
        });

        console.log(`Error occured ${error}`);
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Re-capcha failed!!!
        </Alert>
      </Snackbar>

      <Box
        sx={{
          height: "100vh",
          backgroundImage:
            "url(https://res.cloudinary.com/cake-lounge/image/upload/v1683547902/pngtree-hotel-tourism-minimalist-creative-travel-background-image_1503258_q6p4qj.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register Your Service
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="shopName"
                      variant="standard"
                      required
                      fullWidth
                      id="shopName"
                      label="Service Name"
                      autoFocus
                      placeholder={user.firstName}
                      onChange={(e) => setServiceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="shopDescription"
                      variant="standard"
                      required
                      fullWidth
                      id="shopDescription"
                      label="Description"
                      onChange={(e) => setServiceDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="shopAddress"
                      label="Location"
                      name="address"
                      variant="standard"
                      autoComplete="family-name"
                      onChange={(e) => setServiceLocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Autocomplete
                    id="clear-on-escape"
                    options={serviceTypes}
                    clearOnEscape
                    variant="standard"
                    
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Type"
                        variant="standard"
                      />
                    )}
                    onChange={(event, newValue) => {
                      setServiceType(newValue.label);
                    }}
                  />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="shopAddress"
                      label="Contact Number"
                      name="address"
                      variant="standard"
                      autoComplete="family-name"
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <lable>Upload Profile Image</lable>
                    <br></br>
                    <input
                      type="file"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </div>
  );
}

export default function ServiceSupplierDashboard() {
  const { user } = useUser();
  const { userId, actor } = useAuth();
  const [serviceAccount, setServiceAccount] = useState(null);

  const getServiceAccount = async () => {

    console.log(BASE_URL);

    try {

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(

        "/api/service/get-service-by-user-id",
        {
          userId,
        },

        config
      );
      console.log(data);
      setServiceAccount(data);
      localStorage.setItem("serviceInfo", JSON.stringify(data));
    } 
    catch (error) {
      console.log("Errorrrr");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getServiceAccount();
  }, []);

  console.log("========================Service Account===========================");
  console.log(serviceAccount);
  if(serviceAccount==null){
    return <>Loading....</>;
  }
  else if (!serviceAccount) {
    return <ServiceRegisterForm />;
  } 
  else {
    return <DashboardContent serviceAccount={serviceAccount} />;
  }
}
