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
import { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
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

const columns = [
  { id: "fname", label: "Name", minWidth: 170 },
  { id: "email", label: "Tourist Email", minWidth: 100 },
  {
    id: "customerPhone",
    label: "Conatact",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderStatus",
    label: "Booking Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "country",
    label: "Origin Country",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];


const mdTheme = createTheme();
const AdminServiceBaseUrl = process.env.REACT_APP_ADMIN_SERVICE_BASE_URL;

function AdminOrders() {
  const [open, setOpen] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [bookings, setBooking] = React.useState();
  const [viewOrderStatus, setViewOrderStatus] = React.useState(false);
  const [currentViewOrder, setCurrentViewOrder] = React.useState(null);
  const [orderStatus, setOrderStatus] = React.useState(false);
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("adminInfo"))
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const getAllTourBookings = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/admin/getAllTourBookings",
        {},
        config
      );

      setBooking(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    getAllTourBookings();
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

  const confirmOrder = async (id) => {
    Swal.fire({
      title: "Are you sure to confirm order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = axios.post(
            AdminServiceBaseUrl + "/admin/confirmOrder",
            { id },
            config
          );
          Swal.fire({
            icon: "success",
            title: "Order Confirmed",
            text: "Order has been successfully confirmed",
          });
          getAllTourBookings();
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    });
  };



    function TourBookings(){

      if(bookings){

        return(
          <Container>
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
                  {bookings.booking.map((order) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.code}
                        onClick={() => viewOrder(order)}
                      >
                        {columns.map((column) => {
                          var value = order[column.id];
                        
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {isValidUrl(value) ? (
                                  <Avatar
                                    variant="square"
                                    src={value}
                                    sx={{ width: "80px", height: "80px" }}
                                  ></Avatar>
                                ) : (
                                  column.id==="orderStatus"?(
                                    value==="Pending"?(
                                    <Chip label={value} color="error" />
                                    ):(
                                      value==="Confirmed"?(
                                        <Chip label={value} color="success" />
                                      ):(
                                        <Chip label={value} color="primary" variant="outlined" />
                                      )
                                    )
                                  ):(
                                    value
                                  )
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
        );
      }
      else{

        return(
          <div>Loading...</div>
        )

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
              Bookings
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

        <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224,mt:10 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Tour Bookings" {...a11yProps(0)} />
        <Tab label="Hotel Bookings" {...a11yProps(1)} />
      
      </Tabs>
      <TabPanel value={value} index={0}>

      <TourBookings/>

      </TabPanel>

      <TabPanel value={value} index={1}>

      <TourBookings/>

      </TabPanel>
    </Box>

        {/* End of Orders */}

        
      </Box>
    </ThemeProvider>
  );
}

export default AdminOrders;
