import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GradingIcon from '@mui/icons-material/Grading';
import ArticleIcon from '@mui/icons-material/Article';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton to={"/admin"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton to={"/admin/tourist-bookings"}>
      <ListItemIcon>
        <BookOnlineIcon />
      </ListItemIcon>
      <ListItemText primary="Tourist Bookings" />
    </ListItemButton>

    <ListItemButton to={"/admin/guide-hotel-mng"}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Guide & Hotels" />
    </ListItemButton>

    {/* <ListItemButton to={"/admin/guide-review"}>
      <ListItemIcon>
        <GradingIcon />
      </ListItemIcon>
      <ListItemText primary="Review" />
    </ListItemButton> */}

    <ListItemButton to={"/admin/guide-articals"}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="Articals" />
    </ListItemButton>

  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
