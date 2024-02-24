import { Input, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Button, Box  } from "@mui/material";
import * as React from 'react';
import styles from "./page.module.css";


export default function Schedule() {
  return (
    <main className={styles.main}>
      <h1>Add Your Schedule</h1>

      <Box component="section" sx={{ p: 2, border: '1px solid black'}}>
      <TextField id="class" label="Class" variant="outlined" />
      <TextField id="start-time" label="Start Time" variant="outlined" />
      <TextField id="end-time" label="End Time" variant="outlined" />
      </Box>

      <Button variant="contained">Add Class</Button>

      <div className="submit-header">
        <li>Class</li>
        <li>Start Time</li> 
        <li>End Time</li>
      </div>
    </main>
  );

  
}
