"use client";

import * as Backend from "../backend.js";
import { useCallback, useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  APIProvider,
  Map as GoogleMap,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { useUser } from "@auth0/nextjs-auth0/client";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function Map() {
  const [classList, setClassList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // Load current schedule
  useEffect(() => {
    if (!user || loaded) return;
    Backend.getSchedule(user.sid).then(response => {
      if (response.length === 0) return;
      setLoaded(true);
      setClassList(response);
    });
  });

  const { user } = useUser();
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const getPosition = (): google.maps.LatLngLiteral => {
    navigator.geolocation.getCurrentPosition(position => {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    return { lat: 0, lng: 0 };
  };

  useEffect(() => {
    if (!user) return;
    const pos = getPosition();
    setLocation(pos);
  }, [user]);

  if (!user) {
    return <p>Must be signed in!</p>;
  }

  return (
    <main>
    <TableContainer component={Paper} style={{ display: classList.length > 0 ? "inherit" : "none", margin: "auto", width: '50%', padding: "50px"}}>
  <Table aria-label="Classes">
    <TableHead>
      <TableRow>
        <TableCell><b>Class</b></TableCell>
        <TableCell align="right"><b>Room Number</b></TableCell>
        <TableCell align="right"><b>Time</b></TableCell>
        <TableCell align="right"><b>Building</b></TableCell>
        <TableCell align="right"><b>Select</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {classList.map((item, index) => {
        // Splitting the address to separate building and address
          const building = item.address;
        return (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {item.title}
            </TableCell>
            <TableCell align="right">{item.roomNumber}</TableCell>
            <TableCell align="right">{item.time}</TableCell>
            <TableCell align="right">{building}</TableCell>
            <TableCell align="right">
              <Button style={{backgroundColor: "red", color: "white"}}  onClick={() => changed(building)}>
                Select
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>



      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          defaultCenter={{
            lat: 39.1306472,
            lng: -84.5084785,
          }}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          style={{ width: "800px", height: "600px" }}
        >
          <Directions location={location} />
        </GoogleMap>
      </APIProvider>
    </main>
  );
}

interface DirectionsProps {
  location: google.maps.LatLng | null | undefined;
}

function Directions({ location }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: location as google.maps.LatLng,
        destination: "2900 Reading Rd, Cincinnati OH",
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: false,
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}








async function travelTime(start, end, mode) {
  let options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      start: start,
      end: end,
    })
  }
  return await fetch("http://localhost:8080/directions", options).then(response => (response.json())).then(response => {
    console.log(response);
    // Returns the time in seconds
    return response;
  });
}

async function calculateRoute(destinationLat, destinationLong) {
  // Get current browser location
  let coords = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  let lat = coords.coords.latitude;
  let long = coords.coords.longitude;
  let totalRunningTime = 0;

  // Get all buses that are currently running
  let runningBuses = await fetch("https://uc.transloc.com/Services/JSONPRelay.svc/GetRoutesForMapWithScheduleWithEncodedLine?apiKey=&isDispatch=false").then(response => (response.json())).then(response => {
    return response;
  });
  runningBuses = runningBuses.filter(item => item.IsRunning);
  // Calculate the closest bus stop to the origin
  let originBusStop = calculateClosestStop(lat, long, runningBuses);


  // STEP 1: Calculate the time it takes to get from the starting location to the nearest bus stop. Assume you're walking
  totalRunningTime += await travelTime(`${lat}, ${long}`, `${originBusStop.Latitude}, ${originBusStop.Longitude}`, "WALKING");
  console.log("STEP 1: " + totalRunningTime);

  // Get the nearest bus stop to the ending position
  let destBusStop = calculateClosestStop(destinationLat, destinationLong, runningBuses.filter(bus => {
    // Loop through stops to find the bus with the same stop as the entry stop
    return bus.Stops.filter(item => item.Description === originBusStop.Description).length > 0 ? true : false;
  }));


  // STEP 2: Calculate the time it takes the bus to approach the stop closest to the final destination. This is the time it hits the stop next
  totalRunningTime += destBusStop.SecondsToNextStop;
  console.log("STEP 2: " + destBusStop.SecondsToNextStop);


  // STEP 3: Add the remaining time it takes for the walk from that last bus stop to the final destination
  console.log(destinationLat + " " + destinationLong);
  totalRunningTime += await travelTime(`${destinationLat}, ${destinationLong}`, `${destBusStop.Latitude}, ${destBusStop.Longitude}`, "WALKING");
  console.log("STEP 3: " + totalRunningTime);

  return totalRunningTime;
}

function calculateClosestStop(lat, long, runningBuses) {
  // Calculate the closest bus stop
  let minDistance = null;
  let originBusStop = null;
  for(let bus of runningBuses) {
    let stops = bus.Stops;
    for(let stop of stops) {
      let latitude = stop.Latitude;
      let longitude = stop.Longitude;
      // Calculate distance to this bus stop from our current location
      let distance = calculateDistance(latitude, longitude, lat, long);
      // If this is our first tested bus stop distance, OR this is now the closest bus stop
      if(!minDistance || distance < minDistance) {
        // This is now the closest bus stop
        minDistance = distance;
        originBusStop = stop;
      }
    }
  }
  return originBusStop;
}

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(((y2 - y1) * (y2 - y1)) + ((x2 - x1) * (x2 - x1)));
}


function changed(e) {
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

    for(let sus in addressDataMap) {
      if(sus == e) {
        // console.log();
        calculateRoute(sus.latitude, sus.longitude).then(response => {
          alert("From our current position, it will take " + (response / 60) + " minutes to reach " + e);
        })
      }
    }
}