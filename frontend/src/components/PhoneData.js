import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import PhoneMap from './PhoneMap';

function PhoneData() {
    const [phoneData, setPhoneData] = useState([]);
  
    useEffect(() => {
      const getPhoneData = async function() {
        const res = await fetch("http://localhost:3001/phoneData");
        const data = await res.json();
        setPhoneData(data);
      };
      getPhoneData();
    }, []);

    const startLocation = {
      latitude: 37.7749,
      longitude: -122.4194
    };
    
    const endLocation = {
      latitude: 34.0522,
      longitude: -118.2437
    };

    const middleLocation = {
      latitude: 37.567, 
      longitude: -120.012
    };
    // const middleLocations = [
    //   { latitude: 12.345, longitude: 67.890 },
    //   { latitude: 23.456, longitude: 78.901 },
    //   { latitude: 34.567, longitude: 89.012 }
    // ];
    return (
      <div>
        <h3>Phone data:</h3>
        <ul>
          {phoneData.map((item) => (
            <li key={item._id}>
              User: {item.capturedBy}, Latitude: {item.latitude}, Longitude: {item.longitude}, Capture date: {item.captureDate}, 
              accelerometerX: {item.accelerometerX}, accelerometerY: {item.accelerometerY}, accelerometerZ: {item.accelerometerZ}, 
              userAccelerometerX: {item.userAccelerometerX}, userAccelerometerY: {item.userAccelerometerY}, userAccelerometerZ: {item.userAccelerometerZ}, 
              gyroscopeX: {item.gyroscopeX}, gyroscopeY: {item.gyroscopeY}, gyroscopeZ: {item.gyroscopeZ}, lightIntensity: {item.lightIntensity}
            </li>
          ))}
        </ul>
        <div style={{ height: '500px' }}>
        <PhoneMap
          phoneData={phoneData}
          startLocation={startLocation}
          middleLocation={middleLocation}
          endLocation={endLocation}
        />
      </div>
      </div>
    );
  }

export default PhoneData;