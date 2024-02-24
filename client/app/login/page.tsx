import { FormControl, TextField } from "@mui/material";
import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <h1>Login</h1>
      <form>
        <FormControl>
          <TextField required type="email" label="Email" />
        </FormControl>
      </form>
    </main>
  );
}
