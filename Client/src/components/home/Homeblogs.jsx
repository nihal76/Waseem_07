import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, styled, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Globalstate from "../../ContextAPI/ContextProvider";

const BlogStyle = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2em",
  padding: "1em",
});

const Homeblogs = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user , setuser} = useContext(Globalstate);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs/all");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const redirectProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <BlogStyle>
      {data.map((blog) => {
        // Find the author of the blog
        const blogAuthor = users.find((user) => user._id === blog.userId);
        {/* current logged user */}
        const username = user.username
        const profile = blogAuthor ?  blogAuthor.username === user.username ? blogAuthor.profilePicture : '' : ''
        {/* store user profile picture in context api */}

        return (
          <Box
            key={blog.id}
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              gap: "2em",
              border: "1px solid #ddd",
              padding: "1em",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ maxWidth: "60%" }}>
              <Box
                className="blogTop"
                sx={{ display: "flex", gap: "1em", alignItems: "center" }}
              >
                {
                  blogAuthor ?   <Avatar
                  src={`http://localhost:3000${blogAuthor.profilePicture}`|| ""}
                />  : ''
                }
                <h4
                  style={{ cursor: "pointer", margin: 0 }}
                  onClick={() => redirectProfile(blogAuthor?.username)}
                >
                  {blogAuthor?.username || "Unknown User"}
                </h4>
              </Box>
              <h3 className="title">{blog.title}</h3>
              <p className="content" style={{ textAlign: "justify" }}>
                {blog.content}
              </p>
            </Box>
            {blog.img && (
              <img
                src={`http://localhost:3000${blog.img}`}
                alt="blog"
                style={{ width: "40%", height: "auto", borderRadius: "5%" }}
              />
            )}
          </Box>
        );
      })}
    </BlogStyle>
  );
};

export default Homeblogs;
