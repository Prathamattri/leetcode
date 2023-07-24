import "./App.css"
import Login from "./components/login"
import Signup from "./components/signup"
import Landing from "./components/landing";
import Appbar from "./components/appbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App (){
  const [isAuthenticated,setIsAuthenticated] = useState(false);
 return (
  <Router>
    <Appbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}/>} />
    </Routes>
  </Router>
 )
}

export default App;