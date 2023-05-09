import { Avatar } from '@mui/material';
import React from 'react'
import './Post.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import TextField from "@mui/material/TextField";

export default function Post(props) {

  return (
    <div className="post_container">
      {/* Header */}
      <div className="post_header">
        <Avatar className="user_image" src={props.data.userImage} />
        <div className="post_username">{props.data.userName}</div>
      </div>

      {/* Image */}
      <div className="post_image">
        <img
          src={props.data.imgUrl}
          alt="Post"
          width="615px"
        ></img>
      </div>

      {/* Options */}
      <div>
        <div className="optins_container">
          <FavoriteBorderIcon className="post_react_image" />
          <ChatBubbleOutlineIcon className="post_react_image" />
          <NearMeIcon className="post_react_image" />

          <div style={{ fontWeight: "bold", marginLeft: "-60px" }}>
            {props.data.likes}Likes
          </div>
        </div>
      </div>

      {/* Comment */}
      <div>

        <TextField id="standard-basic" label="Add a comment" variant="standard" 
            sx={{
                height:"56px",
                width:"608px"
            }}
        />
      </div>
    </div>
  );
}
