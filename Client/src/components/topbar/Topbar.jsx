import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {Button, Box} from "@mui/material";
import { styled } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import axios from 'axios'
import Registration from "../../pages/registration/Registration";
import LoginPage from "../../pages/login/LoginPage";
import Globalstate from "../../ContextAPI/ContextProvider";
import {Avatar} from "@mui/material";

const TopbarStyle = styled("div")({
      display: "flex",
      justifyContent: "space-evenly",
      alignItems : 'center'
});

const ListStyle  = styled('ul')({
    display : 'flex',
    gap : '1em',
    fontWeight : '600'
})


const Topbar = () => {
    const global =  useContext(Globalstate)
    const {user} = global
    const navigate = useNavigate()
    // to get current route
    const location = useLocation()


const fetchProfile =async(username) => {
  console.log(username)
    navigate(`/profile/${username}`)
}
const postBlog = async (username) => {
  // redirect to blog creation page
  navigate(`/createBlog/${username}`)
}

  return (
    <TopbarStyle className="topbar">
      <h1 className="logo">Blogs</h1>
      <ListStyle>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            borderBottom: location.pathname === "/" ? "2px solid darkred" : "",
          }}
        >
          Home
        </Link>
        {user.isLoggedIn ? (
          <Link
            to={`/profile/${user.username}`}
            style={{
              textDecoration: "none",
              borderBottom:
                decodeURIComponent(location.pathname) ===
                `/profile/${user.username}`
                  ? "2px solid darkred"
                  : "",
            }}
          >
            My Profile
          </Link>
        ) : (
          ""
        )}
      </ListStyle>
      {user.isLoggedIn ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.3em",
            cursor: "pointer",
          }}
          onClick={() => postBlog(user.username)}
        >
          <CreateIcon />
          Write
        </Box>
      ) : (
        ""
      )}
      <div className="Authentication">
        {user.isLoggedIn ? (
          <Box sx={{display : 'flex', alignItems : 'center', gap : '2em'}}>
            <span onClick={() => fetchProfile(user.username)}>
              <strong style={{ marginRight: "1em", cursor: "pointer" }}>
                {" "}
                {user.username}
              </strong>
            </span>
          </Box>
        ) : (
          <>
            {/* if user has not logged in */}
            <Button
              variant="outlined"
              href="#outlined-buttons"
              component={Link}
              to="/Signup"
              sx={{ marginRight: "1em" }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              href="#outlined-buttons"
              component={Link}
              to="/Signin"
              color="primary"
            >
              Sign In
            </Button>
          </>
        )}
      </div>
    </TopbarStyle>
  );
};

export default Topbar;
