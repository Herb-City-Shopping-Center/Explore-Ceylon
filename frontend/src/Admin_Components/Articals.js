import React from 'react';
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
import {
  mainListItems,
  secondaryListItems,
} from "./listItems";
import { UserButton, useUser, useSignUp, useAuth } from "@clerk/clerk-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Swal from "sweetalert2";
import Title from "./Title";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";



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
const AdminServiceBaseUrl = process.env.REACT_APP_ADMIN_SERVICE_BASE_URL;


export default function Articals() {

    const [open, setOpen] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pic, setPic] = React.useState(null);
    const [viewOrderStatus, setViewOrderStatus] = React.useState(false);
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);
    const [title, setTitle] = React.useState();
    const [addProductState, setAddProductState] = React.useState(false);
    const [description, setDescription] = React.useState(null);

    const [openBar, setOpenBar] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [progress, setProgress] = React.useState("none");
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
    const [updateProgress, setUpdateProgress] = React.useState("none");
    const [updateBtnOpacity, setUpdateBtnOpacity] = React.useState(1);
    const [packages, setPackages] = React.useState(null);
    const [articals, setArticals] = React.useState(null);
    const [loginData, setLoginData] = React.useState(
      JSON.parse(localStorage.getItem("adminInfo"))
    );

    const fileInput = React.useRef();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const { user } = useUser();

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenBar(false);
      setErrorOpen(false);
      setUpdateFailOpen(false);
      setUpdateOpen(false);
    };
  
    const getAllArticals = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        };
        const { data } = await axios.post(
         "/api/admin/get-all-articals",
          {},
          config
        );
  
        setArticals(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getAllArticals();
    }, []);
  
   const postDetails = (pic) => {
    setProgress("block");

    if (pic === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (pic.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", pic);

      data.append("upload_preset", "userImages");

      data.append("cloud_name", "cake-lounge");

      fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setPic(data.url.toString());

          console.log(pic);
          setProgress("none");
          setOpenBar(true);
        })
        .catch((err) => {
          console.log(err);
          setProgress("none");
          setErrorOpen(true);
        });
    } else {
      setProgress("none");
      console.log("Plese upload an image!!!");
    }
  };




  const publish = async () => {

    if(!pic || !title || !description || !lat || !lng){
      Swal.fire({
        icon: "error",
        title: "Please enter all fields",
        text: "error while publishing artical",
      });
    }
    else{
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        };
        const { data } = axios.post(
          "/api/admin/publish-artical",
          { 
            pic,
            title,
            description,
            lat,
            lng
           },
          config
        );

        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Published",
          text: "Artical has been published",
        });
        setAddProductState(false);
        getAllArticals();
      } catch (error) {
        console.log(error);
      }
    }
    
    }

    
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
                  {user ? (
                    <h3 style={{ marginLeft: "10px" }}> Hello, {user.firstName}!</h3>
                  ) : null}
                  {/* {actor && <span>user {actor.sub} has </span>} logged in as user
                  {userId} */}

                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Articals
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
                  <Divider sx={{ my: 1 }} />
                  {/* {secondaryListItems} */}
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
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>

                <React.Fragment>

        <Title>Articals</Title>
        
        <Tooltip title="Add Artical" placement="top-end">
          <Button
            variant="outlined"
            startIcon={<AddBoxIcon />}
            sx={{ width: "200px" }}
            onClick={(e) => setAddProductState(true)}
          >
            Add Artical
          </Button>
        </Tooltip>

        {addProductState?(

          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Articals
            </Typography>
            <Tooltip title="Close" placement="top-end">
              <IconButton sx={{ marginLeft: "35vw" }} onClick={()=>setAddProductState(false)}>
                <ClearIcon sx={{ display: "flex" }} />
              </IconButton>
            </Tooltip>

            <input
              ref={fileInput}
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />

            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Add Artical
              </Typography>

              <Avatar
                src={pic ? pic : null}
                sx={{ width: "300px", height: "300px", marginLeft: "140px" }}
                variant="square"
              >
                Add Package image
              </Avatar>

              <Tooltip title="Change or add profile image">
                <Button color="success" onClick={() => fileInput.current.click()}>
                  Upload Image
                </Button>
              </Tooltip>

              <Box sx={{ width: "100%", display: progress }}>
                <LinearProgress />
              </Box>
              <Snackbar open={openBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                  severity="success"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  Image uploaded!
                </Alert>
              </Snackbar>
              <Snackbar
                open={errorOpen}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="error"
                  sx={{ width: "100%" }}
                  onClose={handleClose}
                >
                  Image not uploaded!
                </Alert>
              </Snackbar>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Title"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  
                  <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Latitude"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    onChange={(e) => setLat(e.target.value)}
                  />
          
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Longitude"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    onChange={(e) => setLng(e.target.value)}
                  />
          
                </Grid>
                
                
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={publish}
                >
                  Publish
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
          </Container>

        ):(
      <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          {articals?(
            articals.articals.map((artical) => (
            <Grid item xs={12} md={4}>
              <Card sx={{ maxWidth: 345, minHeight: 350,maxHeight:450 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={artical.pic}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="p"
                    color="text.primary"
                    sx={{ textAlign: "left", display: "flex" }}
                  >
                    {artical.title.length <= 35
                      ? artical.title
                      : artical.title.substr(0, 35) + "..."}
                  </Typography>
                  <br></br>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    sx={{ display: "flex" }}
                  >
                   
                   {artical.description.length <= 95
                      ? artical.description
                      : artical.description.substr(0, 95) + "..."}
                  </Typography>

                 
                </CardContent>

                <CardActions disableSpacing>
                  <Tooltip title="Update/Delete product" placement="top-end">
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{
                        width: "100%",
                        bottom: 0,
                      }}
                      // onClick={(e) => editProduct(product)}
                    >
                      Update
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))):(
            <div>Loading...</div>
          )
          }
        </Grid>
        )}

        
      </React.Fragment>                
      </Paper>
              </Grid>
            </Grid>

          </Container>
        </Box>

              </Box>
    </ThemeProvider>
           
        );
}