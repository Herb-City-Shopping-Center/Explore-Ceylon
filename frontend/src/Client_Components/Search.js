import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useHistory } from "react-router-dom";

const UserServiceBaseUrl = process.env.REACT_APP_USER_SERVICE_BASE_URL;

function Search() {

    const history  = useHistory();
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = async (event) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        UserServiceBaseUrl + `/user/searchProduct?search=${search}`,
        config
      );
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
    //   window.alert("Failed to Load the Search Results");
    console.log(error);
    }
  };

    const productPage = (product) => {

    history.push({
      pathname: "/product/view",
      state: {
        data: product,
      },
    });
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "615px",
          marginLeft: "60px",
          marginTop: "10px",
          border: "none",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search... "
          inputProps={{ "aria-label": "search users" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>

      {search ? (
        <div>
          <Box
            sx={{
              width: "100%",
              maxHeight: 400,
              maxWidth: 560,
              bgcolor: "background.paper",
              marginLeft: "80px",
              marginTop: "4px",
            }}
          >
            {searchResult ? (
              <div>
                {searchResult.map((product) => (
                  <ListItemButton>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 400,
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem
                        alignItems="flex-start"
                        sx={{ marginLeft: "20px" }}
                        onClick={(e) => productPage(product)}
                        key={product._id}
                      >
                        <ListItemAvatar>
                          <Avatar alt="S" src={product.pic} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.productTitle}
                          secondary={product.categoryName}
                          sx={{ marginTop: "5px" }}
                        />
                      </ListItem>

                      <Divider variant="middle" sx={{ width: "100%" }} />
                    </List>
                  </ListItemButton>
                ))}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Box>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Search;
