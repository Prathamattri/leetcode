import { Box, Button, Container, Grid, Link, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>
}

export default function login(props : Props) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confPass: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // if(formData.password === formData.confPass){
    //     setPassMatching(true);
    // }else{
    //     setPassMatching(false);
    // }
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(formData.password === formData.confPass){
        const res = await axios.post(
          "http://localhost:3000/signup",
          { username: formData.email, password: formData.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.data;
        localStorage.setItem("token",data?.token)
        props.setIsAuthenticated(true);
        navigate("/");
      }else{
        alert("Password Don't match!")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let msg = err.response?.data.msg;
        console.error(msg);
      } else {
        console.error("Got Unknown Error");
      }
    }
  };
  return (
    <div>
      <Container
        maxWidth={"sm"}
        sx={{
          pt: "50px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          width={50}
          height={50}
          src="https://assets.leetcode.com/static_assets/public/icons/favicon-96x96.png"
          alt="Leetcode ICON"
        />
        <h3 style={{ marginTop: "1.2rem" }}>Create A New Account</h3>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            variant="standard"
            autoComplete="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            id="pass"
            label="Password"
            type="password"
            required
            fullWidth
            variant="standard"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="confPass"
            label="Confirm Password"
            type="password"
            required
            fullWidth
            variant="standard"
            name="confPass"
            value={formData.confPass}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
