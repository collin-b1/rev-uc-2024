"use client";
import * as Backend from "../backend.js";
import { makeStyles } from "@mui/styles";
import { Input, TextField, Button, Box, Grid } from "@mui/material";
import * as React from "react";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Get the user
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Schedule() {
  const { user } = useUser();
  const classes = useStyles();
  const [classTitle, setClassTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [address, setAddress] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [classList, setClassList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // Load current schedule
  useEffect(() => {
    if (!user || loaded) return;
    Backend.getSchedule(user.sid).then(response => {
      setLoaded(true);
      setClassList(response);
    });
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (classTitle && start && end && address && roomNum) {
      const newClass = {
        title: classTitle,
        time: `${start} - ${end}`,
        address: address,
        roomNumber: roomNum,
      };

      let newList = [...classList, newClass];
      setClassList(newList);
      setClassTitle("");
      setStart("");
      setEnd("");
      setAddress("");
      setRoomNum("");

      // Send to API
      Backend.updateSchedule(user.sid, newList);
    }
  };

  const handleDelete = (index: number) => {
    const updatedList = [...classList];
    updatedList.splice(index, 1);
    setClassList(updatedList);
    // Send to API
    Backend.updateSchedule(user.sid, updatedList);
  };

  return (
    <main className={styles.main}>
      <Button
        variant="contained"
        style={{
          top: "110px",
          left: "10px",
          position: "absolute",
          backgroundColor: "rgb(170, 0, 0)",
        }}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Home
      </Button>

      <div style={{ textAlign: "center", margin: "50px" }}>
        <h1>Schedule Editor</h1>
        <p>Fill in class information to add it to your account.</p>
      </div>

      <h1 className={styles.h1}></h1>

      <div style={{ textAlign: "center", paddingBottom: "30px" }}>
        <Grid container justifyContent="center" alignItems="center">
          <TextField
            onChange={e => setClassTitle(e.target.value)}
            id="class"
            label="Class"
            variant="outlined"
            value={classTitle}
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
          style={{ width: "20%", height: "50px", marginTop: "15px" }}
          onClick={handleSubmit}
          variant="contained"
          className={styles.button}
        >
          Add Class
        </Button>
      </div>

      <TableContainer
        component={Paper}
        style={{
          display: classList.length > 0 ? "inherit" : "none",
          margin: "auto",
          width: "50%",
          padding: "50px",
        }}
      >
        <Table aria-label="Classes">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Class</b>
              </TableCell>
              <TableCell align="right">
                <b>Room Number</b>
              </TableCell>
              <TableCell align="right">
                <b>Time</b>
              </TableCell>
              <TableCell align="right">
                <b>Address</b>
              </TableCell>
              <TableCell align="right">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classList.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{item.title}</TableCell>
                <TableCell align="right">{item.time}</TableCell>
                <TableCell align="right">{item.address}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    className={styles.deleteButton}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
