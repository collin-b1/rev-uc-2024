"use client";
import * as React from "react";
import * as Backend from "./backend.js";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();
  const [schedule, setSchedule] = useState([]);

  // Get the schedule
  useEffect(() => {
    if (!user) return;
    Backend.getSchedule(user.sid).then(response => {
      if (response.length === 0) return;
      setSchedule(response);
    });
  }, [user]);

  if (!user) {
    return (
      <main className={styles.main}>
        <img
          style={{ borderBottom: "1px solid black" }}
          src="/real.png"
          alt="TransitU"
          height={300}
        />
        <h3 style={{ fontFamily: "sans-serif", marginBottom: "80px" }}>
          Get the most out of your on-campus buses.
        </h3>
        <div style={{ margin: "0% 10%" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              What is TransitU?
            </AccordionSummary>
            <AccordionDetails>
              <b>TransitU</b> is the best way for off-campus students to keep
              track of their classes and to be on-top of their schedule using
              the school&apos;s bus network. We will route you through the
              campus bus system and calculate the fastest way you can arrive at
              your classes.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              How do I get started?
            </AccordionSummary>
            <AccordionDetails>
              Simply register an account and supply your schedule. The next time
              you login, we will route you to your classes using the fastest bus
              routes available.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Which schools is this available for?
            </AccordionSummary>
            <AccordionDetails>
              This is currently being deployed for University of Cincinnati
              students only.
            </AccordionDetails>
          </Accordion>
        </div>

        <div
          style={{
            borderBottom: "1px dashed black",
            padding: "10px 30%",
            marginTop: "30px",
          }}
        ></div>
        {/*Login again*/}
        <Card
          style={{ textAlign: "center", marginTop: "50px" }}
          sx={{ minWidth: 275 }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Ready to start?
            </Typography>
            <Typography variant="h6" my="5px">
              Register an account.
            </Typography>
            <Typography variant="body2">
              <Button href={"/api/auth/login"} size="large">
                Let&apos;s Go
              </Button>
            </Typography>
          </CardContent>
        </Card>
        <div style={{ margin: "50px" }}></div>
      </main>
    );
  }

  // If we have schedule data
  if (schedule.toString().length > 0) {
    return (
      <main className={styles.main}>
        <Welcome username={user.name} />
        <p style={{ marginTop: "0" }}>
          It&apos;s <b>{formatDate(new Date())}.</b> Your next class is coming
          up:
        </p>
        {/*Display classes*/}
        <TableContainer
          component={Paper}
          style={{ marginTop: "50px", width: "50%", padding: "50px" }}
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
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{item.title}</TableCell>
                  <TableCell align="right">{item.time}</TableCell>
                  <TableCell align="right">{item.address}</TableCell>
                  <TableCell align="right">
                    <Button className={styles.deleteButton} href="/map">
                      Navigate
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
  // If there's no scheduling data
  return (
    <main className={styles.main}>
      <Welcome username={user.name} />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography color="text.secondary" variant="h6" my="5px">
            Before you go any further...
          </Typography>
          <Typography variant="body2">
            We don't have your schedule. Input it below to start routing to your
            classes.
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={"schedule"} size="large">
            To Scheduler
          </Button>
        </CardActions>
      </Card>
    </main>
  );
}

function Welcome({ username }) {
  return (
    // Use the sid in the user object as the primary key in the API
    <main>
      <div style={{ display: "flex" }}>
        <p style={{ fontSize: "50px" }}>
          Welcome back, <b>{username}!</b>
        </p>
      </div>
    </main>
  );
}

function dataDetected(props) {
  return (
    <h1>Balls</h1>
    /*<div className={styles.flexContainer}>
        <div className={styles.tableContainer}>
          {rows && (
            <TableContainer
              component={Paper}
              style={{ width: "450px", height: "auto", marginTop: "8px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Building</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Room Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.className}>
                      <TableCell component="th" scope="row">
                        {row.className}
                      </TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                      <TableCell align="right">{row.building}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">{row.roomNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>*/
  );
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour ‘0’ should be ‘12’
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
