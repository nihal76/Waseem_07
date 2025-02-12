import React from 'react'
import Home from './pages/home/Home'
import Registration from './pages/registration/Registration'
import LoginPage from './pages/login/LoginPage'
import PostBlog from './components/PostBlog/PostBlog'
import Blog from './pages/Blog/Blog'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Profilepage from './pages/profile/Profilepage'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Signup" element={<Registration />}></Route>
          <Route path="/Signin" element={<LoginPage />}></Route>
          <Route path='/profile/:username' element = {<Profilepage />}></Route>
          <Route path='/createBlog/:username' element={<PostBlog />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App