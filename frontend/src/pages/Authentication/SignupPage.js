import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validator from "validator";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

export default function SignupPage() {
  const history = useHistory();

  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var isSuccess = true;

    if (!fname) {
      Swal.fire({
        title: "Error!",
        text: "Please enter first name !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }

    if (!lname) {
      Swal.fire({
        title: "Error!",
        text: "Please enter last name !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }

    if (!validator.isEmail(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter valid email !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }

    if (!password) {
      Swal.fire({
        title: "Error!",
        text: "Please enter password !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Please confirm correct password !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
      isSuccess = false;
    }

    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });

    if (isSuccess) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/user",
          {
            fname,
            lname,
            email,
            password,
          },

          config
        );
        console.log(data);

        localStorage.setItem("userInfo", JSON.stringify(data));

        Swal.fire({
          title: "success",
          text: "Registration Success",
          icon: "success",
          confirmButtonText: "Close",
        });

        history.push("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
          footer: '<a href="">Why do I have this issue?</a>',
        });

        console.log(`Error occured ${error.response.data.message}`);
        console.log(error.response);
      }
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage:
          "url(https://res.cloudinary.com/cake-lounge/image/upload/v1674501708/surge-global-featured_qyqzmi.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordType === "password" ? (
                    <VisibilityOffIcon onClick={togglePassword} />
                  ) : (
                    <VisibilityIcon onClick={togglePassword} />
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Re-Enter Password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={confirmPasswordType}
                  />
                  {confirmPasswordType === "password" ? (
                    <VisibilityOffIcon onClick={toggleConfirmPassword} />
                  ) : (
                    <VisibilityIcon onClick={toggleConfirmPassword} />
                  )}
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
