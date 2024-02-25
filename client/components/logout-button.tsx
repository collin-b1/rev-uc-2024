import { Button } from "@mui/material";

export default function LogoutButton() {
  return (
    <Button href="/api/auth/logout" color="inherit">
      Logout
    </Button>
  );
}
