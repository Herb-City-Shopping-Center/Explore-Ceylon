import React from "react";
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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Rating from '@mui/material/Rating';
import ClearIcon from "@mui/icons-material/Clear";
import TourPackage from "./TourPackage";
import HotelPackage from "./HotelPackage";


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

const columns = [
  { id: "profileImage", label: "Profle Image", minWidth: 170 },
  { id: "serviceName", label: "Name of Guide or Hotel", minWidth: 170 },
  { id: "contact", label: "Contact", minWidth: 170 },
  {
    id: "serviceLocation",
    label: "Location",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "serviceType",
    label: "Service Type",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "noOfBookings",
    label: "Bookings Count",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "serviceStatus",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "paymentDue",
    label: "Payment Due",
    minWidth: 170,
    align: "right",
  },
];


const mdTheme = createTheme();
const AdminSellerServiceBaseUrl = process.env.REACT_APP_ADMIN_SELLER_SERVICE_BASE_URL;

function AdminSellers() {

// let revenue = 0;
  const [open, setOpen] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [services, setServices] = React.useState(null);
  const [viewServiceStatus, setViewServiceStatus] = React.useState(false);
  const [currentViewService, setCurrentViewService] = React.useState(null);
  const [currentViewServiceServices, setCurrentViewServiceServices] = React.useState(null);
  const [shopStatus, setShopStatus] = React.useState(false);
  const [servicePackages, setServicePackages] = React.useState(null);
  const [loginData, setLoginData] = React.useState(
    JSON.parse(localStorage.getItem("adminInfo"))
  );
  var revenue=0;

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
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  const viewService = (service)=>{
    setViewServiceStatus(true);
    setCurrentViewService(service);
    getPackagesByServiceId(service);
  }
  const closeService = ()=>{
    setViewServiceStatus(false);
    setCurrentViewService(null);
  }

   const getAllServices= async () => {
     try {
       const config = {
         headers: {
           "Content-type": "application/json",
           Authorization: `Bearer ${loginData.token}`,
         },
       };
       const { data } = await axios.post(
         "/api/admin/getAllServices",
         {},
         config
       );

       setServices(data);
       console.log("services============");
       console.log(data);

       for (let i = 0; i < data.services.length; i++) {
         revenue = revenue + Number(data.services[i].paymentDue);
       }

     } catch (error) {
       console.log(error);
     }
   };
   useEffect(() => {
    getAllServices();
    
   }, []);

   const getPackagesByServiceId= async (service) => {

    console.log(service);
    const serviceId = service._id
    const serviceCode = service.serviceCode;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/admin/getPackagesByServiceId",
        {
          serviceId,
          serviceCode,
        },
        config
      );

      setServicePackages(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
   };

  if(viewServiceStatus){

    const changeServiceStatus=async(service)=>{
      let updateStatus;
      const serviceId = service._id;
      if(service.serviceStatus===1){
        updateStatus = 0;
      }
      else{
        updateStatus = 1;
      }
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/admin/changeServiceStatus",
          {
            serviceId,
            updateStatus,
          },
          config
        );
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Service updated",
          text: "successfully change service status",
          footer: '<a href="">Why do I have this issue?</a>',
        });
  
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to change service status",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        console.log(error);
      }
  
     };
     
    return(
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
              Guide And Hotels
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

            <Container sx={{ marginTop: "15vh" }}>
              
                        <Tooltip title="Close" placement="top-end">
                              <IconButton sx={{ marginLeft: "35vw" }} onClick={closeService}>
                                <ClearIcon sx={{ display: "flex" }} />
                              </IconButton>
                            </Tooltip>
            <Grid
                            container
                            component="main"
                            sx={{ maxHeight: "70vh", marginTop: "20px" }}
                            >
                              
                                <Grid item md={5}>
                                    <Avatar
                                    src={currentViewService.profileImage ? currentViewService.profileImage : null}
                                    sx={{ width: "300px", height: "300px", marginLeft: "30px" }}
                                    alt="S"
                                    ></Avatar>

                                    <h5 style={{ textAlign: "left", display: "flex",fontSize:"20px" }}>
                                        <u>Feedbacks</u>
                                        </h5>

                                    <List
                                        sx={{
                                        width: '100%',
                                        maxWidth: 560,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 200,
                                        '& ul': { padding: 0 },
                                        }}
                                        subheader={<li />}
                                    >
                                        {currentViewService.feedbacks.length>0?(
                                            currentViewService.feedbacks.map((rating) => (

                                            
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

                                            ))
                                        ):(
                                            <div>No feedbacks</div>
                                        )}
                                        
                                    </List>
                                </Grid>

                                <Grid item md={7}>
                                <h3 style={{ textAlign: "left", display: "flex" }}>
                                <u>{currentViewService.serviceName}</u>
                                </h3>

                                <h5 style={{ textAlign: "left", display: "flex" }}>
                                    Location : {currentViewService.serviceLocation}
                                </h5>

                                <h4 style={{ textAlign: "left", display: "flex" }}>
                                <u>About</u>
                                </h4>
                                <p style={{ textAlign: "left", display: "flex" }}>
                                    {currentViewService.serviceDescription}
                                </p>
                                <h4 style={{ textAlign: "left", display: "flex" }}>
                                <u>No of Bookings</u>
                                </h4>
                                <p style={{ textAlign: "left", display: "flex" }}>
                                    {currentViewService.noOfBookings}
                                </p>
                                <h4 style={{ textAlign: "left", display: "flex" }}>
                                <u>Payment Due</u>
                                </h4>
                                <p style={{ textAlign: "left", display: "flex" }}>
                                    {currentViewService.paymentDue}
                                </p>
                                <Button 
                                sx={{ textAlign: "left", display: "flex" }}
                                variant="text"
                                onClick={()=>changeServiceStatus(currentViewService)}>
                                  {currentViewService.serviceStatus===1?"Block Service":"Unblock Service"}
                                </Button>
                                
                                </Grid>


                            </Grid>
                            
                            {/* Shop product section */}
                            <h3 style={{marginTop:"40px"}}><u>Servicess</u></h3>
                            <Divider/>

                            <Grid container spacing={4} sx={{marginTop:"20px"}}>
                              {currentViewService.serviceCode===0?(
                                (servicePackages? (
                                servicePackages.packages.map((pkg) => (
                                  <TourPackage key={pkg.serviceId} pkg={pkg}/>
                                ))
                                ) : (
                                <div>Loading...</div>
                                ))
                                ):(
                                  (servicePackages? (
                                    servicePackages.packages.map((pkg) => (
                                      <HotelPackage key={pkg.serviceId} pkg={pkg}/>
                                    ))
                                    ) : (
                                    <div>Loading...</div>
                                    ))
                                )
                                }
                            </Grid>

                            {/* Shop product section */}
            </Container>
        </Box>
    </ThemeProvider>
    )
  } 
  else{
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
              Guide And Hotels
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

        {/* Orders */}

        <Container sx={{ marginTop: "15vh" }}>
          <h4>Total Revenue : {revenue}</h4>

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

                  {services?(
                  services.services.map((service) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={service.name}
                        onClick={() => viewService(service)}
                      >
                        {columns.map((column) => {
                          var value = service[column.id];
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
                  })):(
                      <div>Loading...</div>
                  )}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={services?services.length:0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
        {/* End of Orders */}

      </Box>
    </ThemeProvider>
  );
   }
}

export default AdminSellers;
