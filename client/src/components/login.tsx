import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>
}

export default function login( props : Props ) {
    const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login",{username:email,password},{
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const data = await res.data;
            localStorage.setItem("token",data?.token);
            props.setIsAuthenticated(true);
            navigate("/");
            
        } catch (err) {
            if(axios.isAxiosError(err)){
                let msg = err.response?.data.msg;
                console.error(msg);
            }else{
                console.error("Got Unknown Error")
            }
        }
    }
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
        <h3 style={{ marginTop: "1.2rem" }}>SignIn To NeetCode</h3>
        <Box component={"form"} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            variant="standard"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            />
          <TextField
            margin="normal"
            id="standard-basic"
            label="Password"
            type="password"
            required
            fullWidth
            variant="standard"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
