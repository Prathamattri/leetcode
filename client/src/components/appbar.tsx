import {
  AppBar,
  Button,
  Container,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


type Props = {
    isAuthenticated : Boolean,
    setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>
  }
  

export default function Appbar(props : Props) {
  return (
    <AppBar position="static" sx={{backgroundColor:"white",justifyContent: "space-between"}}>
      <Container maxWidth="xl" sx={{marginLeft: "unset"}}>
        <Toolbar disableGutters>
          <img
            style={{ height: "40px",flexGrow: 1 }}
            src="https://leetcode.com/static/webpack_bundles/images/logo-dark.e99485d9b.svg"
            alt=""
          />
          <Toolbar sx={{flexGrow: 0,gap: "10px"}}>{!props.isAuthenticated ? <AuthButtons /> : <ProfileButton setIsAuthenticated={props.setIsAuthenticated}/>}</Toolbar>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export function AuthButtons(): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="outlined" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button variant="contained" onClick={() => navigate("/signup")}>
        Create Account
      </Button>
    </>
  );
}

export function ProfileButton(props : Pick<Props,'setIsAuthenticated'>):JSX.Element{
    const handleOnClick = () =>{
        localStorage.removeItem("token");
        props.setIsAuthenticated(false);
    }
    return (
        <>
            <Button variant="outlined" onClick={handleOnClick}>
                LogOut
            </Button>
        </>
    )
}

// function profileButton(){
//     return (
//         <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//     )
// }
