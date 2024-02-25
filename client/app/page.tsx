"use client";
import styles from "./page.module.css";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUser } from "@auth0/nextjs-auth0/client";
import Button from "@mui/material/Button";


interface RowData {
  className: string;
  time: string;
  building: string;
  address: string;
  roomNumber: number;
}

export default function Home() {
  const { user } = useUser();

  const [rows, setRows] = useState<[RowData]>([
    {
      className: "ece 2020",
      time: "10:30 - 12:00",
      building: "Caldwell",
      address: "ballsack",
      roomNumber: 332,
      },
  ]);

  if (!user) {
    return <h1>Sign in first</h1>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.flexContainer}>
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
                  <div style={{ marginTop: '16px', textAlign: 'center'}}>
                      <Button variant="contained" style={{ backgroundColor: 'rgb(170, 0, 0)' }} onClick={() => { window.location.href = '/schedule'; }}>
                          Edit Schedule
                      </Button>
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                      <Button variant="contained" style={{ backgroundColor: 'rgb(170, 0, 0)' }} onClick={() => { window.open('/download.jpg', '_blank'); }}>
                          Fat Fucking Chris
                      </Button>
                  </div>
        </div>
      </div>
    </main>
  );
}
