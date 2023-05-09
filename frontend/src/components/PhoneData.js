import { useState, useEffect } from 'react';

function PhoneData(){
    const [phoneData, setPhoneData] = useState([]);
    useEffect(function(){
        const getPhoneData = async function(){
            const res = await fetch("http://localhost:3001/phoneData");
            const data = await res.json();
            setPhoneData(data);
        }
        getPhoneData();
    }, []);

    return(
        <div>
            <h3>Photos:</h3>
            <ul>
                {phoneData.map((item) => (
                <li key={item._id}>
                    User: {item.capturedBy}, Latitude: {item.latitude}, Longitude: {item.longitude}, Capture date: {item.captureDate}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default PhoneData;