"use client";
import { makeStyles } from '@mui/styles';
import { Input, TextField, Button, Box, Grid} from "@mui/material";
import * as React from "react";
import styles from "./page.module.css";
import { useState } from "react";




const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Schedule() {
  const classes = useStyles();
  const [classTitle, setClassTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [address, setAddress] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [classList, setClassList] = useState([]);

    

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (classTitle && start && end && address && roomNum) {
        const newClass = {
            title: classTitle,
            time: `${start} - ${end}`,
            address: address,
            roomNumber: roomNum
        };
        setClassList([...classList, newClass]);

        setClassTitle("");
        setStart("");
        setEnd("");
        setAddress("");
        setRoomNum("");
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Add Your Schedule</h1>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ p: 4, border: "1px solid black" }}
      >
        <TextField
          onChange={e => setClassTitle(e.target.value)}
          id="class"
          label="Class"
                  variant="outlined"
                  value={classTitle }
          required
        />
              <TextField
                  onChange={e => setRoomNum(e.target.value)}
                  id="Num"
                  label="Room Number"
                  variant="outlined"
                  value={roomNum}
                  required
              />
        <TextField
          onChange={e => setStart(e.target.value)}
          id="start-time"
          label="Start Time"
          variant="outlined"
          value={start}
          required
        />

        <TextField
          onChange={e => setEnd(e.target.value)}
          id="end-time"
          label="End Time"
          variant="outlined"
          value={end}
          required
              />
              <TextField
                  onChange={e => setAddress(e.target.value)}
                  id="address"
                  label="Address"
                  variant="outlined"
                  value={address}
                  required
              />
             
      </Grid>

      

      <Button
        onClick={handleSubmit}
        variant="contained"
        className={styles.button}
      >
        Add Class
      </Button>

      <table>
        <tbody>
          <tr>
            <td className={styles.td}></td>
            <td className={styles.td}>Class</td>
            <td className={styles.td}>Room Number</td>
            <td className={styles.td}>Time</td>
            <td className={styles.td}>Address</td>
            <td className={styles.td}></td>
          </tr>
          {classList.map((item, index) => (
              <tr key={index}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.title}</td>
                  <td className={styles.td}>{item.roomNumber}</td>
                  <td className={styles.td}>{item.time}</td>
                  <td className={styles.td}>{item.address}</td>
                  <td className={styles.td}>
                      <button className={styles.deleteButton} onClick={() => handleDelete(index)}>Delete</button>
                  </td>
              </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
