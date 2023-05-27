import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ExploreIcon from '@mui/icons-material/Explore';


function Navigation() {
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ExploreIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "black" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "blue",
              textDecoration: "none",
            }}
          >
            Explore-Ceylon
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "blue",
              textDecoration: "none",
            }}
          >
            Tour Packages
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "blue",
              textDecoration: "none",
            }}
          >
            Accommodations
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "blue",
              textDecoration: "none",
            }}
          >
            Blogs
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;
