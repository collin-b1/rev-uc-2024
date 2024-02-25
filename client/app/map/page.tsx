"use client";

import { useCallback, useState } from "react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useUser } from "@auth0/nextjs-auth0/client";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 39.1306472,
  lng: -84.5084785,
};

export default function Map() {
  const { user } = useUser();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const [map, setMap] = useState<GoogleMap | null>(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  if (!user) {
    return <p>Must be signed in!</p>;
  }

  return (
    <main>
      {!isLoaded && <p>Loading map...</p>}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={1.5}
          onLoad={onLoad}
        ></GoogleMap>
      )}
    </main>
  );
}
