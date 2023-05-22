import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

function PhoneMap({ phoneData, startLocation, middleLocation, endLocation }) {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([0, 0], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

      phoneData.forEach(item => {
        const marker = L.marker([item.latitude, item.longitude]).addTo(map);
        marker.bindPopup(`User: ${item.capturedBy}, Capture date: ${item.captureDate}`);
      });

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startLocation.latitude, startLocation.longitude),
        L.latLng(middleLocation.latitude, middleLocation.longitude),
        L.latLng(endLocation.latitude, endLocation.longitude)
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [
          {
            color: 'green',
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      createMarker: function() { return null; }
    }).addTo(map);

    routingControlRef.current = routingControl;

    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.getPlan().setWaypoints([]);
        routingControlRef.current.hide();
        map.removeControl(routingControlRef.current);
      }
      if (map && typeof map.remove === 'function') {
        map.remove();
      }
    };
  }, [phoneData, startLocation, middleLocation, endLocation]);

  return (
    <div ref={mapRef} style={{ height: '500px' }} />
  );
}

export default PhoneMap;
