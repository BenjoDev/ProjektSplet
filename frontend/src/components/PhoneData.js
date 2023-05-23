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

    return (
      <div>
        {/* <h3>Phone data:</h3> */}
        {/* <ul>
          {phoneData.map((item) => (
            <li key={item._id}>
              User: {item.capturedBy}, Latitude: {item.latitude}, Longitude: {item.longitude}, Capture date: {item.captureDate}, 
              accelerometerX: {item.accelerometerX}, accelerometerY: {item.accelerometerY}, accelerometerZ: {item.accelerometerZ}, 
              userAccelerometerX: {item.userAccelerometerX}, userAccelerometerY: {item.userAccelerometerY}, userAccelerometerZ: {item.userAccelerometerZ}, 
              gyroscopeX: {item.gyroscopeX}, gyroscopeY: {item.gyroscopeY}, gyroscopeZ: {item.gyroscopeZ}, lightIntensity: {item.lightIntensity}
            </li>
          ))}
        </ul> */}
        <PhoneMap
          phoneData={phoneData}
        />
      </div>
    );
  }

export default PhoneData;