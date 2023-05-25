import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

function PhoneData() {
  const [phoneData, setPhoneData] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchPhoneData = async () => {
      console.log("fetch")

      try {
        const res = await fetch('http://localhost:3001/phoneData');
        const data = await res.json();
        setPhoneData(data);
      } catch (error) {
        console.error('Error fetching phone data:', error);
      }
    };

    fetchPhoneData();

    const interval = setInterval(fetchPhoneData, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      fullscreenControl: true
    }).setView([0, 0], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    const updateMap = () => {
      console.log("map");

      map.eachLayer(layer => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
        }
      });

      phoneData.forEach(item => {
        let color = 'gray';
        if (item.roadQuality === 0) {
          color = 'green';
        } else if (item.roadQuality === 1) {
          color = 'orange';
        } else if (item.roadQuality === 2) {
          color = 'red';
        }

        const polyline = L.polyline(
          [
            L.latLng(item.latitude_start, item.longitude_start),
            L.latLng(item.latitude_end, item.longitude_end)
          ],
          {
            color: color
          }
        ).addTo(map);
      });
    };
    updateMap();


    return () => {
      if (map && typeof map.remove === 'function') {
        map.remove();
      }
    };
  }, [phoneData]);

  return (
    <div>
      <div style={{ height: '100vh', width: '100vw' }}>
      <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
    </div>
  );
}

export default PhoneData;
