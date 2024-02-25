"use client"
import { Input, TextField, Button, Box, Grid, makeStyles  } from "@mui/material";
import * as React from 'react';
import styles from "./page.module.css";
import { useState } from "react";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Schedule() {
  const classes = useStyles()
  const [classTitle, setClassTitle] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    if (classTitle && start && end){
      console.log(classTitle, start, end)
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Add Your Schedule</h1>

      <Grid container justifyContent = "center" alignItems='center'  sx={{ p: 4, border: '1px solid black'}}>
      <TextField onChange={(e) => setClassTitle(e.target.value)}
       id="class" label="Class" variant="outlined" required />

      <TextField onChange={(e) => setStart(e.target.value)}
       id="start-time" label="Start Time" variant="outlined" required />

      <TextField onChange={(e) => setEnd(e.target.value)}
       id="end-time" label="End Time" variant="outlined" required />
      </Grid>

      <br></br>

      <Button onClick={() => console.log('you clicked me')}
       variant="contained"  className={styles.button}>Add Class</Button>

      <table>
        <tbody>
        <tr>
          <td className={styles.td}>Class</td>
          <td className={styles.td}>Start Time</td> 
          <td className={styles.td}>End Time</td>
        </tr>
        </tbody>
      </table>
    </main>
  );

  
}
