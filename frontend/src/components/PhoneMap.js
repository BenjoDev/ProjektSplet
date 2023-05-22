import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

function PhoneMap({ phoneData, startLocation, middleLocation, endLocation }) {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(map);

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
      }
    }).addTo(map);

    phoneData.forEach(item => {
      const marker = L.marker([item.latitude, item.longitude]).addTo(map);
      marker.bindPopup(`User: ${item.capturedBy}, Capture date: ${item.captureDate}`);
    });

    return () => {
      if (map && typeof map.removeLayer === 'function') {
        map.removeLayer(routingControl);
        map.remove();
      }
    };
  }, [phoneData, startLocation, middleLocation, endLocation]);

  return <div id="map" style={{ height: '400px' }}></div>;
}

export default PhoneMap;
