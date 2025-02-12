import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRef } from 'react';
import axios from 'axios'
import { useParams, useLocation ,useNavigate} from "react-router-dom";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  gap:'1em'
})

const PostBlog = () => {
  const titleRef = useRef(null)
    const contentRef = useRef(null);
    const navigate = useNavigate()

   const {username} = useParams()
   console.log('username ', username)
  
  const [img, selectedfile] = useState(null)

  const handlePost =async (event) => {
    event.preventDefault();
    console.log('image ', img)
     const formData = new FormData();
     formData.append('file', img);
     formData.append("content", contentRef.current.value);
     formData.append("title", titleRef.current.value);
     console.log('formData', formData);
    try {
    const response = await axios.post(`http://localhost:3000/api/blogs/upload/${username}`,formData)
    console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const backtohome = () => {
    navigate(`/`)
  }

  return (
    <StyledForm onSubmit={handlePost}>
      <h1>Post a Blog</h1>
      <TextField
        label="Heading"
        variant="outlined"
        inputRef={titleRef}
        sx={{ width: "50%" }}
      />
      <TextField
        label="Content"
        variant="outlined"
        inputRef={contentRef}
        multiline
        sx={{ width: "50%", maxLines: "4" }}
      />
      {/* upload file mui button */}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        size="small"
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          name="file"
          onChange={(event) => selectedfile(event.target.files[0])}
        />
      </Button>
      <p style={{color:'darkred', fontWeight : '600'}}>{img ? img.name : ""}</p>
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ marginRight: "1em" }}
        >
          Post
        </Button>
        <Button type="submit" variant="outlined" onClick={backtohome}>
          Cancel
        </Button>
      </Box>
    </StyledForm>
  );
}

export default PostBlog