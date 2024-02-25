import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./page.module.css";

export default function Login() {
  return (
    <Container className={styles.main}>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Login
          </Typography>
          <FormControl>
            <TextField required type="email" label="Email" />
            <TextField required type="password" label="Password" />
            <Button variant="contained" type="submit" defaultValue="Login">
              Login
            </Button>
          </FormControl>
        </Box>
      </Container>
    </Container>
  );
}
