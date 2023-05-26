import React from 'react'
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Title from "./Title";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./Profile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import validator from "validator";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import Products from './Products';

const categories = [
  { label: "Suppliments", code: "Suppliments" },
  { label: "Beauty", code: "Beauty" },
  { label: "Grocery", code: "Grocery" },
  { label: "Bath", code: "Bath" },
  { label: "Baby", code: "Baby" },
  { label: "Healthy Home", code: "HealthyHome" },
  { label: "Pets", code: "Pets" },
];

function EditProduct(props) {

    const {product} = props;

    const [addProductState, setAddProductState] = useState(false);
    const [productUpdateState, setProductUpdateState] = useState(false);

    const [shopId, setShopId] = React.useState(
      JSON.parse(localStorage.getItem("shopInfo"))._id
    );
    const [productTitle, setProductTitle] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [stock, setStock] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [pic, setPic] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [progress, setProgress] = React.useState("none");
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
    const [updateProgress, setUpdateProgress] = React.useState("none");
    const [updateBtnOpacity, setUpdateBtnOpacity] = React.useState(1);
    const [products, setProducts] = React.useState(null);

    const fileInput = React.useRef();

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
      setErrorOpen(false);
      setUpdateFailOpen(false);
      setUpdateOpen(false);
    };

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
            setOpen(true);
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

    const publish = async (event) => {
        
    }

   return (
     <div className="edit_form">
       <input
         ref={fileInput}
         type="file"
         style={{ display: "none" }}
         accept="image/*"
         onChange={(e) => postDetails(e.target.files[0])}
       />

       <Box sx={{ maxWidth: "50%", marginTop: "50px", marginLeft: "200px" }}>
         <Tooltip title="Close" placement="top-end">
           <IconButton
             sx={{ marginLeft: "35vw" }}
             onClick={(e) => <Products />}
           >
             <ClearIcon sx={{ display: "flex" }} />
           </IconButton>
         </Tooltip>
         <Typography variant="h6" gutterBottom>
           Update Product
         </Typography>
         <Avatar
           src={pic ? pic : null}
           sx={{ width: "300px", height: "300px", marginLeft: "140px" }}
           variant="square"
         >
           Add product image
         </Avatar>

         <Tooltip title="Change or add profile image">
           <Button color="success" onClick={() => fileInput.current.click()}>
             Upload Image
           </Button>
         </Tooltip>
         <Box sx={{ width: "100%", display: progress }}>
           <LinearProgress />
         </Box>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
           <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
             Image not uploaded!
           </Alert>
         </Snackbar>
         <Grid container spacing={3}>
           <Grid item xs={12} sm={12}>
             <TextField
               required
               id="productTitle"
               name="productTitle"
               label="Product Title"
               fullWidth
               autoComplete="given-name"
               variant="standard"
               onChange={(e) => setProductTitle(e.target.value)}
             />
           </Grid>

           <Grid item xs={12} sm={12}>
             <Autocomplete
               id="clear-on-escape"
               options={categories}
               clearOnEscape
               renderInput={(params) => (
                 <TextField
                   {...params}
                   label="Select Category"
                   variant="standard"
                 />
               )}
               onChange={(event, newValue) => {
                 setCategory(newValue);
               }}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               required
               fullWidth
               id="stock"
               label="Item Qty"
               name="stock"
               variant="standard"
               onChange={(e) => setStock(e.target.value)}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               required
               fullWidth
               id="price"
               label="Unit Price"
               name="price"
               variant="standard"
               onChange={(e) => setPrice(e.target.value)}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               required
               fullWidth
               id="description"
               label="Description"
               multiline
               rows={3}
               maxRows={6}
               variant="standard"
               name="description"
               autoComplete="family-name"
               onChange={(e) => setDescription(e.target.value)}
             />
           </Grid>
         </Grid>
         <Box sx={{ width: "100%", display: updateProgress }}>
           <LinearProgress />
         </Box>
         <Grid item xs={12} sx={{ marginTop: "50px", marginBottom: "50px" }}>
           <Snackbar
             open={updateOpen}
             autoHideDuration={6000}
             onClose={handleClose}
           >
             <Alert
               severity="success"
               sx={{ width: "100%" }}
               onClose={handleClose}
             >
               Product Published
             </Alert>
           </Snackbar>

           <Snackbar
             open={updateFailOpen}
             autoHideDuration={6000}
             onClose={handleClose}
           >
             <Alert
               severity="error"
               sx={{ width: "100%" }}
               onClose={handleClose}
             >
               Failed to publish
             </Alert>
           </Snackbar>

           <Grid container spacing={2}>
             <Grid item xs={12}>
               <Tooltip
                 title="Publish your product to customers"
                 placement="top-end"
               >
                 <Button
                   variant="contained"
                   color="success"
                   onClick={publish}
                   sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
                 >
                   Publish Producttttt
                 </Button>
               </Tooltip>
             </Grid>
           </Grid>
         </Grid>
       </Box>
     </div>
   );
}

export default EditProduct