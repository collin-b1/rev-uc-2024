"use client";

import { useCallback, useEffect, useState } from "react";

import {
  APIProvider,
  Map as GoogleMap,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { useUser } from "@auth0/nextjs-auth0/client";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 39.1306472,
  lng: -84.5084785,
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function Map() {
  const { user } = useUser();

  if (!user) {
    return <p>Must be signed in!</p>;
  }

  return (
    <main>
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
          <Directions />
        </GoogleMap>
      </APIProvider>
    </main>
  );
}

function Directions() {
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
        origin: "2348 Ohio Ave, Cincinnati OH",
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
