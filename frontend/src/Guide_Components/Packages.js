import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Title from "./Title";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
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

import { useAuth,useUser } from "@clerk/clerk-react";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const categories = [
  { label: "Suppliments", code: "Suppliments" },
  { label: "Beauty", code: "Beauty" },
  { label: "Grocery", code: "Grocery" },
  { label: "Bath", code: "Bath" },
  { label: "Baby", code: "Baby" },
  { label: "Healthy Home", code: "HealthyHome" },
  { label: "Pets", code: "Pets" },
];

function preventDefault(event) {
  event.preventDefault();
}

const SellerServiceBaseUrl = process.env.REACT_APP_SELLER_SERVICE_BASE_URL;;


export default function Packages() {

  const { user } = useUser();

  const { userId, actor } = useAuth();

  const [addPackageState, setAddPackageState] = useState(false);
  const [packageUpdateState, setPackageUpdateState] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(null);

  const [serviceId, setServiceId] = React.useState(
    JSON.parse(localStorage.getItem("serviceInfo")).service._id
  );

  console.log("================Shop Id ===============");
  console.log(serviceId);

  const [packageTitle, setPackageTitle] = React.useState(null);
  const [guideName, setGuideName] = React.useState(user?user.fullName:null);
  const [budget, setBudget] = React.useState(null);
  const [numberOfDays, setNumberOfDays] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [numberOfPeoples, setNumberOfPeoples] = React.useState(null);
  const [vehicleType, setVehicleType] = React.useState(null);
  const [accommodations, setAccommodations] = React.useState();
  const [description, setDescription] = React.useState(null);
  const [displayPic, setDisplayPic] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [progress, setProgress] = React.useState("none");
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [updateFailOpen, setUpdateFailOpen] = React.useState(false);
  const [updateProgress, setUpdateProgress] = React.useState("none");
  const [updateBtnOpacity, setUpdateBtnOpacity] = React.useState(1);
  const [packages, setPackages] = React.useState(null);

  const fileInput = React.useRef();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const changeState = () => {
    setAddPackageState(false);
  };
  const changeUpdateState = () => {
    setCurrentUpdate(null);
    setPackageUpdateState(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
    setUpdateFailOpen(false);
    setUpdateOpen(false);
  };

  const getPackagesByServiceId = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/service/get-packages-by-guide-id",
        {
          serviceId,
        },

        config
      );
      console.log("==================Package List================");
      console.log(data);
      setPackages(data);
    } catch (error) {
      console.log("Error getting products");
      console.log(error);
    }
  };

  useEffect(() => {
    getPackagesByServiceId();
  }, []);

  const editProduct = (packages) => {
    setCurrentUpdate(packages);
    console.log("-------------------------------");
    console.log(packages);
    setPackageTitle(packages.packageTitle);
    setDescription(packages.description);
    setDisplayPic(packages.displayPic);
    setAccommodations(packages.accommodations);
    setPackageUpdateState(true);
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
          setDisplayPic(data.url.toString());

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
    setUpdateProgress("block");
    setUpdateBtnOpacity(0.5);
    var isSuccess = true;
    if (!packageTitle || !guideName || !budget || !destination || !description) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      isSuccess = false;
      setUpdateBtnOpacity(1);
      setUpdateProgress("none");
    }

    if (isSuccess) {

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/service/add-guide-package",
          {
            serviceId,
            guideName,
            packageTitle,
            description,
            budget,
            numberOfDays,
            destination,
            numberOfPeoples,
            vehicleType,
            accommodations,
            displayPic,

           
          },
          config
        );
        Swal.fire({
          icon: "success",
          title: "Published",
          text: "Package published successfully",
        });
        console.log(data);
        setUpdateProgress("none");
        setUpdateOpen(true);
        setUpdateBtnOpacity(1);
        setAddPackageState(false);
      } catch (error) {
        setUpdateProgress("none");
        setUpdateFailOpen(true);
        setUpdateBtnOpacity(1);
        console.log(error.response.data.error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    }
  };

  const update = async (product) => {

    var _id = product._id;

    if(!accommodations){
      setAccommodations(product.categoryName);
    }
    

    setUpdateProgress("block");
    setUpdateBtnOpacity(0.5);
    var isSuccess = true;

    
    if (
      !packageTitle ||
      !description
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      isSuccess = false;
      setUpdateBtnOpacity(1);
      setUpdateProgress("none");
    }

    if (isSuccess) {
      

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          SellerServiceBaseUrl + "/shop/updateProduct",
          {
            _id,
          },
          config
        );
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Product updated successfully",
        });
        console.log(data);
        setUpdateProgress("none");
        setUpdateOpen(true);
        setUpdateBtnOpacity(1);
        setAddPackageState(false);
        setPackageUpdateState(false);
        setCurrentUpdate(null);
        getPackagesByServiceId();
      } catch (error) {
        setUpdateProgress("none");
        setUpdateFailOpen(true);
        setUpdateBtnOpacity(1);
        console.log(error.response.data.error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    }
  };
  const deleteProduct = async (id) => {

    if(!id){
      alert("Id is null");
    }
    else{
    Swal.fire({
      title: "Are you sure to delete product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = axios.post(
          SellerServiceBaseUrl + "/shop/deleteProduct",
          {
            id,
          },
          config
        );
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Product deleted successfully",
        });
        console.log(data);
        setUpdateProgress("none");
        setUpdateBtnOpacity(1);
        setAddPackageState(false);
        setPackageUpdateState(false);
        setCurrentUpdate(null);
        getPackagesByServiceId();
      } catch (error) {
        setUpdateProgress("none");
        setUpdateFailOpen(true);
        setUpdateBtnOpacity(1);
        console.log(error.response.data.error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
      }
    });
  }
   
  };
  if (addPackageState && !packageUpdateState) {
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
            <IconButton sx={{ marginLeft: "35vw" }} onClick={changeState}>
              <ClearIcon sx={{ display: "flex" }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" gutterBottom>
            Add Package
          </Typography>
          <Avatar
            src={displayPic ? displayPic : null}
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
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Image not uploaded!
            </Alert>
          </Snackbar>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Guide Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                defaultValue={user.fullName}
                onChange={(e) => setGuideName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Package Title"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setPackageTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Accommodation Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setAccommodations(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="stock"
                label="Package Budget"
                name="stock"
                variant="standard"
                type="Number"
                onChange={(e) => setBudget(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Number of Days"
                name="price"
                variant="standard"
                type="Number"
                onChange={(e) => setNumberOfDays(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Destination"
                variant="standard"
                onChange={(e) => setDestination(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Number Of Peoples"
                variant="standard"
                onChange={(e) => setNumberOfPeoples(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Vehicle Type"
                variant="standard"
                onChange={(e) => setVehicleType(e.target.value)}
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
                    Publish Package
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else if (!packages) {
    <div>
      <h4>Loading...</h4>
    </div>;
  } else if (packageUpdateState && !addPackageState) {
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
            <IconButton sx={{ marginLeft: "35vw" }} onClick={changeUpdateState}>
              <ClearIcon sx={{ display: "flex" }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" gutterBottom>
            Update Product
          </Typography>
          <Avatar
            src={currentUpdate.displayPic ? currentUpdate.displayPic : null}
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
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Image not uploaded!
            </Alert>
          </Snackbar>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Guide Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                defaultValue={currentUpdate.guideName}
                onChange={(e) => setGuideName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Package Title"
                fullWidth
                autoComplete="given-name"
                defaultValue={currentUpdate.packageTitle}
                variant="standard"
                onChange={(e) => setPackageTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Accommodation Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                defaultValue={currentUpdate.accommodations}
                onChange={(e) => setAccommodations(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="stock"
                label="Package Budget"
                name="stock"
                variant="standard"
                type="Number"
                defaultValue={currentUpdate.budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Number of Days"
                name="price"
                variant="standard"
                defaultValue={currentUpdate.numberOfDays}
                type="Number"
                onChange={(e) => setNumberOfDays(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Destination"
                variant="standard"
                defaultValue={currentUpdate.destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Number Of Peoples"
                variant="standard"
                defaultValue={currentUpdate.numberOfPeoples}
                onChange={(e) => setNumberOfPeoples(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Vehicle Type"
                variant="standard"
                defaultValue={currentUpdate.vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
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
                defaultValue={currentUpdate.description}
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
                Product Updated
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
                Failed to update
              </Alert>
            </Snackbar>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip
                  title="Publish your product to customers"
                  placement="top-end"
                >
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
                    onClick={() => update(currentUpdate)}
                  >
                    Update Product
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item xs={6}>
                <Tooltip title="Delete product" placement="top-end">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={()=>deleteProduct(currentUpdate._id)}
                    sx={{ opacity: updateBtnOpacity, marginLeft: "40px" }}
                  >
                    Delete Product
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Title>Your Packages</Title>
        <Tooltip title="Add product to your store" placement="top-end">
          <Button
            variant="outlined"
            startIcon={<AddBoxIcon />}
            sx={{ width: "200px" }}
            onClick={(e) => setAddPackageState(true)}
          >
            Add Package
          </Button>
        </Tooltip>

        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          {packages.map((pkg) => (
            <Grid item xs={12} md={4}>
              <Card sx={{ maxWidth: 345, minHeight: 350 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={pkg.displayPic}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="p"
                    color="text.primary"
                    sx={{ textAlign: "left", display: "flex" }}
                  >
                    {pkg.packageTitle.length <= 35
                      ? pkg.packageTitle
                      : pkg.packageTitle.substr(0, 35) + "..."}
                  </Typography>
                  <br></br>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    sx={{ textAlign: "left", display: "flex" }}
                  >
                    Budget : {pkg.budget}
                  </Typography>

                  <Typography
                    variant="p"
                    color="text.secondary"
                    sx={{ textAlign: "match-parent", display: "flex" }}
                  >
                    Destination : {pkg.destination}
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
                      onClick={(e) => editProduct(pkg)}
                    >
                      Update
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}
