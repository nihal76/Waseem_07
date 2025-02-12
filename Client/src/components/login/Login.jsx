import { TextField, Button, styled} from "@mui/material";
import axios from "axios";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Globalstate from "../../ContextAPI/ContextProvider";
import { Link } from "react-router-dom";

export const Login = () => {

    const {user,setuser}  = useContext(Globalstate)
        console.log("user ", user);
  const username = useRef();
  const password = useRef();
  const [res, setresponse] = useState(true);
  const[text,setresponsetext] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const userdetails = {
      username: username.current.value,
      password: password.current.value,
    };
    let response
    try {
       response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userdetails
      );
      console.log('response login', response)
      if(response.status === 200){
        // store the data in context
        setresponse(true)
          setuser({...user, username : username.current.value, isLoggedIn : true})
        navigate("/");
      }
    } catch (error) {
            setresponse(false);
      setresponsetext(error.response.data)
    }
    console.log('global state ', user)
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
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{display : 'flex', flexDirection : 'column'}} >
          <TextField
            label="username"
            name="username"
            margin="normal"
            required
            inputRef={username}
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
          <Link style={{ textDecoration: "none" }}>
            Forgot Password ? <Button>Reset</Button>
          </Link>
      </form>
      <h4 style={{color : 'darkred'}}>{res ? '' : text}</h4>
    </div>
  );
};
