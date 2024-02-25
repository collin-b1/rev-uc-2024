import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function LoginButton() {
  return (
    <Button href="/api/auth/login" color="inherit">
      Login
    </Button>
  );
}
