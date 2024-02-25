"use client";
import * as Backend from '../backend.js';
import { makeStyles } from '@mui/styles';
import { Input, TextField, Button, Box, Grid} from "@mui/material";
import * as React from "react";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
    if(!user || loaded) return;
    Backend.getSchedule(user.sid).then(response => {
      setLoaded(true);
      setClassList(response);
    });
  })

    const handleChange = (event) => {
        setAddress(event.target.value);
    };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (classTitle && start && end && address && roomNum) {
      const newClass = {
        title: classTitle,
        time: `${start} - ${end}`,
        address: address,
        roomNumber: roomNum
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

  const handleDelete = (index) => {
    const updatedList = [...classList];
    updatedList.splice(index, 1);
    setClassList(updatedList);
        // Send to API
      Backend.updateSchedule(user.sid, updatedList);

    };

    //silly billy addressData :)
    const addressDataMap = {
        "Braunstein Hall": { latitude: "39.133150", longitude: "-84.518479", street: "2825 Campus Way, Cincinnati, OH 45219" },
        "Geology Physics Building": { latitude: "39.133702", longitude: "-84.518410", street: "345 Clifton Ct, Cincinnati OH 45221" },
        "Arts & Sciences Hall": { latitude: "39.132115", longitude: "-84.519205", street: "2700 Campus Way, Cincinnati OH 45221" },
        "Dyer Hall": { latitude: "39.130311", longitude: "-84.518522", street: "2610 University Cir, Cincinnati OH 45221" },
        "Teachers College": { latitude: "39.130201", longitude: "-84.519563", street: "2610 University Cir, Cincinnati OH 45221" },
        "College of Law": { latitude: "39.135170", longitude: "-84.519980", street: "2925 Campus Green Dr, Cincinnati, OH 45221" },
        "Corbett Center for Performing Arts": { latitude: "39.130039", longitude: "-84.518199", street: "290 CCM Blvd, Cincinnati OH 45221" },
        "Mary Emery Hall": { latitude: "39.130568", longitude: "-84.517557", street: "290 CCM Blvd, Cincinnati OH 45221" },
        "Memorial Hall": { latitude: "39.129609", longitude: "-84.517315", street: "285 CCM Blvd, Cincinnati OH 45221" },
        "Aronoff Center - College of Design, Architecture, Art and Planning": { latitude: "39.134665", longitude: "-84.518610", street: "342 Clifton Ct, Cincinnati OH 45221" },
        "Old Chemistry Building": { latitude: "39.133359", longitude: "-84.517609", street: "2855 Campus Way, Cincinnati, OH 45219" },
        "Swift Hall": { latitude: "39.132645", longitude: "-84.517355", street: "2842 Campus Way, Cincinnati OH 45221" },
        "Baldwin Hall": { latitude: "39.133082", longitude: "-84.516718", street: "2850 Campus Way, Cincinnati OH 45221" },
        "Rhodes Hall": { latitude: "39.133042", longitude: "-84.515762", street: "2851 Woodside Dr, Cincinnati OH 45221" },
        "Zimmer Hall": { latitude: "39.133649", longitude: "-84.516881", street: "315 College Dr, Cincinnati OH 45221" },
        "Edwards Center": { latitude: "39.129385", longitude: "-84.512451", street: "45 W. Corry Blvd, Cincinnati OH 45221" },
        "Engineering Research Center": { latitude: "39.133494", longitude: "-84.515523", street: "2901 Woodside Drive, Cincinnati, OH 45221" },
        "Carl H Lindner Hall": { latitude: "39.133978", longitude: "-84.514551", street: "2906 Woodside Drive, Cincinnati OH 45221" },
        "Crosley Tower (My Beloved)": { latitude: "39.134794", longitude: "-84.516593", street: "301 Clifton Ct, Cincinnati OH 45221" },
        "Rieveschl Hall": { latitude: "39.134024", longitude: "-84.516933", street: "318 College Dr, Cincinnati OH 45221" },
        "French Hall (West)": { latitude: "39.132429", longitude: "-84.512643", street: "2815 Commons Way, Cincinnati OH 45221" },
        "Langsam Library": { latitude: "39.134556", longitude: "-84.515413", street: "2911 Woodside Dr, Cincinnati OH 45221" },
        "Dieterle Vocal Arts Center": { latitude: "39.130497", longitude: "-84.516867", street: "280 CCM Blvd, Cincinnati OH 45221" },
        "Blegen Library": { latitude: "39.129700", longitude: "-84.519391", street: "2602 University Cir, Cincinnati OH 45221" },
        "UC Centers & Classrooms at U-Square": { latitude: "39.128137", longitude: "-84.516135", street: "225 Calhoun Street, Cincinnati OH 45219" },
        "Clifton Court Hall": { latitude: "39.133238", longitude: "-84.519611", street: "2800 Clifton Avenue, Cincinnati OH 45221" },
        "Health Sciences Building": { latitude: "39.138922", longitude: "-84.505724", street: "3225 Eden Avenue, Cincinnati OH 45267" },
        "Lindner College of Business": { latitude: "39.133894", longitude: "-84.514520", street: "2906 Woodside Drive, Cincinnati, OH 45221" }
    };

 


  return (
    <main className={styles.main}>
    <Button variant="contained" style={{ top: "110px", left: "10px", position: "absolute", backgroundColor: 'rgb(170, 0, 0)' }} onClick={() => { window.location.href = '/'; }}>
      Home
    </Button>

    <div style={{ textAlign: "center", margin: "50px" }}>
      <h1>Schedule Editor</h1>
      <p>Fill in class information to add it to your account.</p>
    </div>
    
    <h1 className={styles.h1}></h1>

    <div style={{ textAlign: "center", paddingBottom: "30px"}}>
    <Grid
    container
    justifyContent="center"
    alignItems="center"
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

  <Grid item xs={12} sm={4}>
    <FormControl fullWidth>
      <InputLabel id="address-label">Address</InputLabel>
      <Select labelId="address-label" id="address" value={address} label="Address" onChange={handleChange}>
        <MenuItem value="">Select an address</MenuItem>
        {Object.keys(addressDataMap).map((addr, index) => (
            <MenuItem key={index} value={addr}>
              {addr}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  </Grid>
    </Grid>

    <Button
    style={{width: "20%", height: "50px", marginTop: "15px"}}
    onClick={handleSubmit}
    variant="contained"
    className={styles.button}
    >
    Add Class
    </Button>
    </div>

    <TableContainer component={Paper} style={{ display: classList.length > 0 ? "inherit" : "none", margin: "auto", width: '50%', padding: "50px"}}>
  <Table aria-label="Classes">
    <TableHead>
      <TableRow>
        <TableCell><b>Class</b></TableCell>
        <TableCell align="right"><b>Room Number</b></TableCell>
        <TableCell align="right"><b>Time</b></TableCell>
        <TableCell align="right"><b>Building</b></TableCell>
        <TableCell align="right"><b>Address</b></TableCell>
        <TableCell align="right"><b>Delete</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {classList.map((item, index) => {
        // Splitting the address to separate building and address
          const building = item.address;
          const address = addressDataMap[item.address]?.street || "";
        return (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {item.title}
            </TableCell>
            <TableCell align="right">{item.roomNumber}</TableCell>
            <TableCell align="right">{item.time}</TableCell>
            <TableCell align="right">{building}</TableCell>
            <TableCell align="right">{address}</TableCell>
            <TableCell align="right">
              <Button style={{backgroundColor: "red", color: "white"}} className={styles.deleteButton} onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>
    </main>
    );
}
