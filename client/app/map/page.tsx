"use client";

import styles from "./page.module.css";
import { useEffect, useMemo, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useLoadScript } from "@react-google-maps/api";

export default function Map() {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });
    let map;
    loader.importLibrary("maps").then(() => {
      map = new google.maps.Map(googlemap.current!, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  });
  return <div id="map" ref={googlemap} />;
}
