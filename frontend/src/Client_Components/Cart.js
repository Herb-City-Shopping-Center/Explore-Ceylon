import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Header from "../Navigation/Header";
import Footer from "../Client_Components/Footer";
import Grid from "@mui/material/Grid";
import './Cart.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 800,
}));

const sections = [
  { title: "Home", url: "/" },
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
];
const theme = createTheme();

const UserCartServiceBaseUrl = process.env.REACT_APP_USER_CART_SERVICE_BASE_URL;

function Cart() {

    const history = useHistory();

    const { userId, actor } = useAuth();
    const { user } = useUser();

    const [cartItems, setCartItems] = useState([]);
    const [customerId, setCustomerId] = useState(user?userId:null);

    const checkoutCart = () => {
        
      if(cartItems.length<1){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nothing in cart",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      else{
        history.push({
          pathname: "/product/checkout",
          state: {
            data: cartItems,
          },
        });
      }
    };

    const getCartList = async()=>{

        setCustomerId(user?userId:null);

           try {
             const config = {
               headers: {
                 "Content-type": "application/json",
               },
             };
             const { data } = await axios.post(
               UserCartServiceBaseUrl+"/cart/getCartList",
               { customerId },
               config
             );

             setCartItems(data);
             console.log(data);
           } catch (error) {
             console.log(error.response.data.error);
           }
    }

    useEffect(() => {
      getCartList();
    }, []);

    const removeItem= async(id)=>{

        try {
             const config = {
               headers: {
                 "Content-type": "application/json",
               },
             };
             const { data } = await axios.post(
               UserCartServiceBaseUrl+"/cart/removeCartItem",
               { id },
               config
             );
             console.log(cartItems);
             getCartList();
           } catch (error) {
             console.log(error.response.data.error);
           }
    }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Header title="Welcome to Herb-City" sections={sections} />

        <h4>My Cart</h4>

        <Box
          sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}
          className="cartBox"
        >
          {cartItems ? (
            cartItems.map((cartItem) => (
              <Item
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                  maxWidth: "50vw",
                }}
              >
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Avatar
                    variant="square"
                    sx={{ minHeight: "150px", minWidth: "200px" }}
                    src={cartItem.productImage}
                  ></Avatar>
                  <Stack spacing={2} direction="column" alignItems="stretch">
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textAlign: "top", display: "flex" }}
                    >
                      {cartItem.productTitle.length <= 35
                        ? cartItem.productTitle
                        : cartItem.productTitle.substr(0, 45) + "..."}
                    </Typography>

                    <Typography
                      variant="body"
                      color="text.secondary"
                      sx={{ textAlign: "top", display: "flex" }}
                    >
                      MRP : {cartItem.productPrice}.00 lkr
                    </Typography>

                    <Typography
                      variant="body"
                      color="text.secondary"
                      sx={{ textAlign: "top", display: "flex" }}
                    >
                      Quantity : {cartItem.quantity}
                    </Typography>

                    <Typography
                      variant="body"
                      color="text.secondary"
                      sx={{ textAlign: "top", display: "flex" }}
                    >
                      Total : {cartItem.quantity * cartItem.productPrice}.00 lkr
                    </Typography>
                  </Stack>
                  <Tooltip title="Remove item" placement="top-end">
                    <IconButton
                      sx={{ height: "35px", width: "35px" }}
                      //   onClick={changeState}
                    >
                      <ClearIcon
                        sx={{ display: "flex" }}
                        onClick={() => removeItem(cartItem._id)}
                      />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Item>
            ))
          ) : (
            <>
            
                <h4>Loading</h4>
            </>
          )}
          {cartItems.length<1? <h5>Cart is empty</h5>:null}
        </Box>
        <Button
          variant="outlined"
          color="success"
          sx={{ marginTop: "40px" }}
          onClick={checkoutCart}
        >
          Checkout Cart
        </Button>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default Cart