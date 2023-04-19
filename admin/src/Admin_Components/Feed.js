import React from "react";
import Post from "./Post";
import "./Feed.css";
import { useEffect, useState } from "react";

export default function Feed() {
  const [postList, setPostList] = useState([]);

  let postData = [
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
    {
      id: "12345",
      userName: "Sahan",
      userImage:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      imgUrl:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1663143045/WilludaInn/samantha-gades-fIHozNWfcvs-unsplash_l6xerk.jpg",
      timestamp: "1234",
      likes: "1245",
    },
  ];

  useEffect(() => {
    setPostList(postData);
  }, []);

  return (
    <div className="screllable_feed">
      {postList.map((item) => (
        <Post data={item} />
      ))}
    </div>
  );
}
