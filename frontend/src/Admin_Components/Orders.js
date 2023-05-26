import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { UserButton, useUser, useSignUp, useAuth } from "@clerk/clerk-react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";



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


function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export default function Orders() {

  const [bookings, setBooking] = useState();
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("adminInfo"))
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);



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


  if(bookings){

    return(
      <Container>
        <h3>Recent Bookings</h3>
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
                              value
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
