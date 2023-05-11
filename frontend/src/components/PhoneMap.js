import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function PhoneMap({ phoneData }) {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(map);

    phoneData.forEach(item => {
      const marker = L.marker([item.latitude, item.longitude]).addTo(map);
      marker.bindPopup(`User: ${item.capturedBy}, Capture date: ${item.captureDate}`);
    });

    return () => {
      map.remove();
    };
  }, [phoneData]);

  return <div id="map" style={{ height: '400px' }}></div>;
}

export default PhoneMap;