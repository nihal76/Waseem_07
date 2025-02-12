import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Globalstate from "../../ContextAPI/ContextProvider";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import { styled, Box,  TextField, Button  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

const BoxStyle = styled(Box)({
  display: "flex",
  gap: "5em",
  width : '100vw'
});

const Profilepage = () => {
  console.log('profile..')
  const Global = useContext(Globalstate)
  const loggedUser = Global.user
  console.log('loggeduser ', loggedUser)
  const [result, setResult] = useState({user  : {}, userBlogs : [{}]});
  const [options, setoptions] = useState({
    toggle : false,
    blogId : ''
  })
  // const { user, userBlogs } = result;
  const { user , userBlogs} = result;
  const navigate = useNavigate()
  console.log('result ', result)
  console.log('user ', user)
  console.log(userBlogs)

  // Fetch username from dynamic route, ex: /profile/:username -> /profile/Nihal
  const {username} = useParams();
  const [Username,setUserName] = useState(username)

  // for editing blog
  const[edit,setedit] = useState({
    toggle : false,
    blogId : ''
  })
  // for profile edit
  const [profile,setprofile] = useState(false)
  const[profileData,setprofileData] = useState({
    username : "",
    email : "",
    password : ""
  })
  // for handling file upload
  const[file,setfile] = useState(null)
  const [editdata, seteditdata] = useState({
    title : '',
    content : ''
  })
  // for logout
  const[islogout, setlogout] = useState(false)
  const[logoutmsg, setlogoutmsg] = useState(null) 
  // to fetch all blogs and users 
   async function fetchBlogs() {
     try {
       const response =  await axios.get(`http://localhost:3000/api/blogs/${Username}`);

       console.log("profile:", response.data);
       setResult(response.data);
       setprofileData({
         userId: response.data.user._id,
         username: response.data.user.username,
         email: response.data.user.email,
         password: response.data.user.password,
       });
     } catch (error) {
       console.error("Error fetching user data:", error);
     }
   }

  useEffect(() => {
    fetchBlogs();
  }, []);

  // run useEffect only when update operation is successfull

  //delete blog
  const deleteBlog = async(blogId) => {
    console.log('delete blog..', blogId)
      const response = await axios.delete(`http://localhost:3000/api/blogs/delete/${blogId}`);
      const remainingBlogs = await axios.get(`http://localhost:3000/api/blogs/${Username}`)
      setResult({
        ...result,
        userBlogs : remainingBlogs.data.userBlogs
      })
  }

  // edit blog
  const editBlog = async (blog) => {
    setedit({
      toggle : true,
      blogId : blog._id
    })
    seteditdata({
       title : blog.title,
       content : blog.content
    })
    console.log("blog ", blog);
  }
  const handleChange = (event) => {
     seteditdata({
       ...editdata,
       [event.target.name] : event.target.value
     })
  }

  // to manage the user state updates
  const handleProfile = (event) => {
      setprofileData({
        ...profileData,
          [event.target.name] : event.target.value      
      })
  }
  // to update the user information
  const updateProfile = async() => {
    const formData = new FormData()
    formData.append('username', profileData.username)
        formData.append("email", profileData.email);
            formData.append("password", profileData.password);
               if(file){
                 formData.append("file", file);
               }
    const updatedUser = await axios.put(
      `http://localhost:3000/api/users/update/${loggedUser.username}`,
      formData
    );
    console.log('updated username ', updatedUser)
        // setusername(updatedUser.data.username);
    console.log("updatedUser ", updatedUser);
    setUserName(updatedUser.data.username)
    setResult({
      ...result,
      user : updatedUser.data
    })
    const {user,setuser} = Global
    setuser({
      ...user,
      username: updatedUser.data.username,
      profile : updatedUser.data.profilePicture
    });
    setprofile(false)
  }

  console.log('updated user state ', result.user)

  const Update = async() => {
    // store updated data in FormData for processing image
    const formData = new FormData();
    formData.append("title", editdata.title);
    formData.append("content", editdata.content);
    {
      file ? formData.append("file", file) : "";
    }
    const response = await axios.put(
      `http://localhost:3000/api/blogs/update/${edit.blogId}`,
      formData
    );
    setedit({
      toggle : false,
      blogId : ''
    });
    setoptions({
      toggle: false,
      blogId: "",
    });
    //  update only userBlogs state
    const updatedBlogs = await axios.get(`http://localhost:3000/api/blogs/${Username}`);
    setResult({
      ...result,
      userBlogs: updatedBlogs.data.userBlogs,
    });
    console.log("updated res of blog", updatedBlogs);
  }

  // logout user
  const logoutUser = async() => {
    const confirmation = await axios.delete(`http://localhost:3000/api/auth/register/logout/${Username}`);
    setlogoutmsg(confirmation.data.msg)
    // change global state of logged in user to logged out
      const {user,setuser} =  Global
      setuser({
        username: null,
        profile: null,
        isLoggedIn: false,
      })
  }
  console.log('updated...............', result.user)

  return (
    <div>
      <Topbar />

      {logoutmsg ? (
        <>
          <h3>{logoutmsg}</h3>
        </>
      ) : (
        <BoxStyle>
          {/* if user has been logged out */}
          {/* show only current logged user */}
          {loggedUser.username === Username ? (
            <Box
              className="sidebar"
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "20vw",
                alignItems: "center",
                gap: "0.5em",
              }}
            >
              <h2>Profile</h2>
              <Avatar
                src={`http://localhost:3000${user.profilePicture}`}
                sx={{ height: "5em", width: "5em" }}
              />

              {profile ? (
                <TextField
                  type="file"
                  name="file"
                  onChange={(event) => setfile(event.target.files[0])}
                  sx={{ border: "none" }}
                />
              ) : (
                ""
              )}
              {/* <h5>Upload Photo</h5> */}
              <Box>
                <p>
                  Username :
                  {profile ? (
                    <TextField
                      name="username"
                      value={profileData.username}
                      onChange={handleProfile}
                    />
                  ) : (
                    user.username
                  )}
                </p>
                <p>
                  Email :
                  {profile ? (
                    <TextField
                      name="email"
                      value={profileData.email}
                      onChange={handleProfile}
                    />
                  ) : (
                    user.email
                  )}
                </p>
                <p>
                  Password :
                  {profile ? (
                    <TextField
                      name="password"
                      value={profileData.password}
                      onChange={handleProfile}
                    />
                  ) : (
                    user.password
                  )}
                </p>
                {profile ? (
                  <>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={updateProfile}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setprofile(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ marginRight: "1em" }}
                    onClick={() => setprofile(true)}
                  >
                    Edit
                    <EditIcon sx={{ marginLeft: "0.3em" }} />
                  </Button>
                )}
                {/* logout */}
                {!islogout ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setlogout(true)}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <h4>Do you want to logout ?</h4>
                    <Button
                      sx={{
                        backgroundColor: "#E0115F",
                        color: "#fff",
                        marginRight: "1em",
                      }}
                      onClick={logoutUser}
                    >
                      Ok
                    </Button>
                    <Button variant="outlined" onClick={() => setlogout(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          ) : (
            ""
          )}

          <Box
            className="userBlogs"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
              justifyContent: "center",
            }}
          >
            {loggedUser.username === Username ? (
              <h1>My Blogs</h1>
            ) : (
              <Box sx={{display : 'flex', gap : '1em', alignItems : 'center'}}>
                <Avatar src={`http://localhost:3000${result.user.profilePicture}`} />
                <h4>{Username}</h4>
              </Box>
            )}
            {/* user blogs */}
            {userBlogs?.length > 0 ? (
              userBlogs.map((blog) => (
                <Box
                  className="blog"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1em",
                    width: "80%",
                  }}
                >
                  <Box key={blog._id}>
                    {edit.blogId === blog._id && edit.toggle ? (
                      <TextField
                        type="text"
                        name="title"
                        value={editdata.title}
                        onChange={handleChange}
                      />
                    ) : (
                      <Box
                        className="head"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3>{blog.title} </h3>
                        <Box sx={{ display: "flex" }}>
                          {options.blogId === blog._id && options.toggle ? (
                            <List sx={{ backgroundColor: "lightgrey" }}>
                              <ListItem
                                sx={{ height: "2em" }}
                                onClick={() => editBlog(blog)}
                              >
                                <ListItemButton>
                                  <ListItemText primary="Edit" />
                                </ListItemButton>
                              </ListItem>
                              <ListItem sx={{ height: "2em" }}>
                                <ListItemButton>
                                  <ListItemText
                                    primary="Delete"
                                    onClick={() => deleteBlog(blog._id)}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </List>
                          ) : (
                            ""
                          )}
                          {/* edit,delete icon for only  for our profile*/}
                          {loggedUser.username === Username ? (
                            <MoreVertIcon
                              onClick={() =>
                                options.toggle
                                  ? setoptions({
                                      blogId: "",
                                      toggle: !options.toggle,
                                    })
                                  : setoptions({
                                      blogId: blog._id,
                                      toggle: true,
                                    })
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Box>
                      </Box>
                    )}
                    {edit.blogId === blog._id && edit.toggle ? (
                      <TextField
                        type="text"
                        name="content"
                        value={editdata.content}
                        onChange={handleChange}
                        multiline
                        sx={{ width: "100%" }}
                      />
                    ) : (
                      <p style={{ textAlign: "justify" }}>{blog.content}</p>
                    )}
                    <Box className="options">
                      {edit.blogId === blog._id && edit.toggle ? (
                        <>
                          <Button
                            variant="contained"
                            sx={{ marginRight: "1em" }}
                            color="warning"
                            onClick={Update}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            color="transparent"
                            onClick={() => {
                              setedit({
                                toggle: false,
                                blogId: "",
                              });
                              setoptions({
                                toggle: false,
                                blogId: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                          <TextField
                            type="file"
                            name="file"
                            onChange={(event) => setfile(event.target.files[0])}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <img
                    src={`http://localhost:3000${blog.img}`}
                    style={{ width: "50%", height: "50%" }}
                  />
                </Box>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </Box>
        </BoxStyle>
      )}
    </div>
  );
};

export default Profilepage;
