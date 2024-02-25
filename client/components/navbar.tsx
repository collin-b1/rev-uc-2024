import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import NavButtons from "./nav-buttons";
import Image from "next/image";
import Logo from "../public/real.png";

export default function NavBar() {
  return (
    <Box>
          <AppBar position="static" style={{ backgroundColor: 'rgb(139, 0, 0)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
                  <Image src={Logo} alt="Image" height={100}/>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <NavButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
