"use client";
import styles from "./page.module.css";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface RowData {
    className: string;
    time: string;
    building: string;
    address: string;
    number: number;
}

function createData(
    className: string,
    time: string,
    building: string,
    address: string,
    number: number,
): RowData {
    return { className, time, building, address, number };
}

export function TodayDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <p>Happy {formattedDate}!</p>
    );
}

export default function Thing() {

    const [rows, setRows] = React.useState<RowData[]>([]);

    const fetchData = () => {
        const classData = [
            {
                class: "ece 2020",
                time: "10:30 - 12:00",
                building: "Caldwell",
                address: "ballsack",
                roomNumber: 332
            },
            
                
           
            
        ];

        
        const rowsData: RowData[] = classData.map(data => createData(data.class, data.time, data.building, data.address, data.roomNumber));

     
        setRows(rowsData);
    };

    React.useEffect(() => {
        
        fetchData();
    }, []); 
    const scaleFontSize = '69%';

        return (
            <main className={styles.main}>
                <TodayDate />
            <div className={styles.flexContainer}>
                <div className={styles.tableContainer}>
                    <TableContainer component={Paper} style={{ width: '450px', height: 'auto' }}>
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
                                {rows.map((row) => (
                                    <TableRow key={row.className}>
                                        <TableCell component="th" scope="row" style={{ fontSize: scaleFontSize }}>
                                            {row.className}
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: scaleFontSize }}>{row.time}</TableCell>
                                        <TableCell align="right" style={{ fontSize: scaleFontSize }}>{row.building}</TableCell>
                                        <TableCell align="right" style={{ fontSize: scaleFontSize }}>{row.address}</TableCell>
                                        <TableCell align="right" style={{ fontSize: scaleFontSize }}>{row.number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <button onClick={fetchData}>Refresh</button>
                </div>
                <div style={{ border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "10px", padding: "10px", height: "", flexGrow: 1, float: "right", display: "flex", alignItems: "stretch" }}>
                    <img src="download.jpg" alt="Image" style={{ width: "100%", objectFit: "cover" }} />
                </div>
            </div>
        </main>
    );
}