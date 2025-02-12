import { TextField, Button, styled} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import Button from "@mui/material";


export const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const [res, setresponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    console.log("user ", user);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        user
      );
      setresponse(response.data);
    } catch (error) {

      setresponse(error.response.data)
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "35%",
        justifyContent: "center",
        margin: "auto",
        marginTop: "2em",
      }}
    >
      <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{display : 'flex', flexDirection : 'column'}} >
          <TextField
            label="username"
            name="username"
            margin="normal"
            required
            inputRef={username}
          />
          <TextField
            label="email"
            name="email"
            type="email"
            required
            margin="normal"
            inputRef={email}
          />
          <TextField
            label="password"
            name="password"
            type="password"
            required
            margin="normal"
            inputRef={password}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Submit
          </Button>
          <Link to={"/Signin"} style={{ textDecoration: "none" }}>
            Already have account ? <Button>Sign In</Button>
          </Link>
        </form>
      <h4>{res ? res : ''}</h4>
    </div>
  );
};
