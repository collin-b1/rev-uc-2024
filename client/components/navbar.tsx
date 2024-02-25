import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import NavButtons from "./nav-buttons";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Bus Route
                  </Typography>
                  <img src="real.png" alt="Image" style={{ width: "200px", height: "auto", }} />

          <NavButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
