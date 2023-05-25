import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Header from "../../Navigation/Header";
import Footer from './../Footer';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth,useUser } from "@clerk/clerk-react";
import Autocomplete from "@mui/material/Autocomplete";
import { State, City,Country } from 'country-state-city';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const sections = [
  { title: "Home", url: "/" },
  { title: "Tour Bookings", url: "/bookings" },
  { title: "Hotel Bookings", url: "/hotel-bookings" },
];

const deliveryMethods = [
  { label: "DHL (600.00 lkr per item)", code: "DHL", cost: 600 },
  { label: "Aramex (500.00 lkr per item)", code: "Aramex", cost: 500 },
  { label: "UPS (800.00 lkr per item)", code: "UPS", cost: 800 },
  { label: "Pronto (300.00 lkr per item)", code: "Pronto", cost: 300 },
  { label: "DomEx (450.00 lkr per item)", code: "DomEx", cost: 450 },
];

const theme = createTheme();


const BaseUrl =
  process.env.BASE_URL;

export default function Checkout(props) {

    const { userId, actor } = useAuth();
      const { user } = useUser();


  const history = useHistory();
  const data = props.history.location.state?.data;
  console.log(data);

  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [customerPhone, setCustomerPhone] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState(null);
  const [customerId, setCustomerId] = useState(user?userId:null);
  const [countryCode, setCountryCode] = useState("SL");
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();


  const back =()=>{
     history.push({
       pathname: "/package/view",
       state: {
         data: data,
       },
     });
  }


  const toPayment = async()=>{


    user ? setCustomerId(userId) : setCustomerId(null);

    

    const bookingInfo = {
      fname: fname,
      lname: lname,
      email: email,
      customerPhone: customerPhone,
      selectedCity: selectedCity,
      selectedState: selectedState,
      country: country,
      customerId: customerId,
      date: date
    };

    if (
      !fname||
      !lname||
      !email||
      !customerPhone||
      !selectedCity||
      !selectedState||
      !country||
      !customerId||
      !date
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter required fields",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
      localStorage.setItem("packageInfo", JSON.stringify(data));

      fetch("/api/user/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [data],
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          window.location = url;
        })
        .catch((e) => {
          console.log(e);
          console.error(e.error);
        });
    }
  }


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
              Booking Form
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(e) => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="email"
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Contact"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                Pickup Location
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  options={State.getStatesOfCountry(countryCode).map((option) => option.name)}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setSelectedState(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="State" />}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  options={City.getCitiesOfState(countryCode, "E").map((option) => option.name)}
                  sx={{mt:2}}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setSelectedCity(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="City" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <p>Select Date</p>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />

              </Grid>
              <Grid item xs={12} sm={6}>
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  options={Country.getAllCountries().map((option) => option.name)}
                  sx={{mt:2}}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setCountry(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Origin Country" />}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

              <Button sx={{ mt: 3, ml: 1 }} onClick={back}>
                Back
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={toPayment}
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


