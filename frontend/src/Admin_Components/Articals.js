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

const tempArticals = [

    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    {
        title:"Sigiriya",
        description:"Sample description",
        image:"https://res.cloudinary.com/cake-lounge/image/upload/v1683482089/2021-11-08_6188cd6b8a608_Sigiriya_wj6kbx.jpg"
    },
    
]

export default function Articals() {

    const [open, setOpen] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [viewOrderStatus, setViewOrderStatus] = React.useState(false);
    const [currentViewOrder, setCurrentViewOrder] = React.useState(null);
    const [orderStatus, setOrderStatus] = React.useState(false);
    const [addProductState, setAddProductState] = React.useState(false);
    const [products, setProducts] = React.useState(null);


    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const { user } = useUser();
    const { userId, actor } = useAuth();
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const getAllOrders = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          AdminServiceBaseUrl + "/admin/getAllOrders",
          {},
          config
        );
  
        // setOrders(data);
        console.log(data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    useEffect(() => {
      getAllOrders();
    }, []);
  
    const viewOrder = (order) => {
      setViewOrderStatus(true);
      setCurrentViewOrder(order);
      if (order.orderStatus === "Completed") {
        setOrderStatus(true);
      }
    };
  
    function isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (err) {
        return false;
      }
    }

    const editProduct = (product) => {
        // setCurrentUpdate(product);
        // console.log("-------------------------------");
        // console.log(product);
        // setProductTitle(product.productTitle);
        // setStock(product.stock);
        // setPrice(product.price);
        // setDescription(product.description);
        // setPic(product.pic);
        // setCategory(product.categoryName);
        // setProductUpdateState(true);
      };

    
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
        <Tooltip title="Add product to your store" placement="top-end">
          <Button
            variant="outlined"
            startIcon={<AddBoxIcon />}
            sx={{ width: "200px" }}
            onClick={(e) => setAddProductState(true)}
          >
            Add Artical
          </Button>
        </Tooltip>

        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          {tempArticals.map((product) => (
            <Grid item xs={12} md={4}>
              <Card sx={{ maxWidth: 345, minHeight: 350 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={product.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="p"
                    color="text.primary"
                    sx={{ textAlign: "left", display: "flex" }}
                  >
                    {product.title.length <= 35
                      ? product.title
                      : product.title.substr(0, 35) + "..."}
                  </Typography>
                  <br></br>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    sx={{ display: "flex" }}
                  >
                   {product.description}
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
                      onClick={(e) => editProduct(product)}
                    >
                      Update
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>                </Paper>
              </Grid>
            </Grid>

          </Container>
        </Box>

              </Box>
    </ThemeProvider>
           
        );
}