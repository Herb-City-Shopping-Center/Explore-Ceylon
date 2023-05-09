import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useState, useEffect } from "react";
import ProductView from "./ProductView";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";



export default function Products(props) {

  const history = useHistory();
  const { product } = props;

  const toProductView = () => {
   
    history.push({
      pathname: "/product/view",
      state: {
        data: product,
      },
    });
  };

    return (
      <Grid item xs={12} md={4}>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image={product.pic}
            alt="Paella dish"
            onClick={toProductView}
          />

          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left", display: "flex" }}
            >
              {product.productTitle.length <= 35
                ? product.productTitle
                : product.productTitle.substr(0, 35) + "..."}
            </Typography>

            <br></br>
            <Typography
              variant="p"
              color="text.secondary"
              sx={{ textAlign: "left", display: "flex" }}
            >
              MRP : {product.price}.00 lkr
            </Typography>

            <Typography
              variant="p"
              color="text.secondary"
              sx={{ textAlign: "match-parent", display: "flex" }}
            >
              Available Stock : {product.stock}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
           

            <Tooltip title="See more details" placement="top-end">

              <Button
                variant="outlined"
                startIcon={<InfoIcon />}
                sx={{ marginLeft: "80px" }}
                onClick={toProductView}
              >

                View Product
                
              </Button>

            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    );
              
}
