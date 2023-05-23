import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

function PhoneMap({ phoneData, startLocation, middleLocation, endLocation }) {
  const mapRef = useRef(null);
  const routingControlRefs = useRef([]);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      fullscreenControl: true
    }).setView([0, 0], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);


    phoneData.forEach(item => {
      let color = 'gray'; 
      if (item.roadQuality === 0) {
        color = 'green';
      }
      else if (item.roadQuality === 1){
        color = 'orange'; 
      }
      else if (item.roadQuality === 2){
        color = 'red';
      }


      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(item.latitude_start, item.longitude_start),
          // L.latLng(middleLocation.latitude, middleLocation.longitude),
          L.latLng(item.latitude_end, item.longitude_end)
        ],
        
        routeWhileDragging: true,
        lineOptions: {
          styles: [
            {
              
              color: color,
              opacity: 0.6,
              weight: 4
            }
          ]
        },
        createMarker: function() { return null; }

      }).addTo(map);

      routingControlRefs.current.push(routingControl);

    });


    return () => {
      routingControlRefs.current.forEach((routingControlRef) => {
        if (routingControlRef) {
          routingControlRef.getPlan().setWaypoints([]);
          routingControlRef.hide();
          map.removeControl(routingControlRef);
        }
      });

      if (map && typeof map.remove === 'function') {
        map.remove();
      }
    };
  }, [phoneData, startLocation, middleLocation, endLocation]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default PhoneMap;
