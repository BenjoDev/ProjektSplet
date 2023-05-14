import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoneData() {
    const userContext = useContext(UserContext); 
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[accelerometerX, setAccelerometerX] = useState('');
    const[accelerometerY, setAccelerometerY] = useState('');
    const[accelerometerZ, setAccelerometerZ] = useState('');
    const[userAccelerometerX, setUserAccelerometerX] = useState('');
    const[userAccelerometerY, setUserAccelerometerY] = useState('');
    const[userAccelerometerZ, setUserAccelerometerZ] = useState('');
    const[gyroscopeX, setGyroscopeX] = useState('');
    const[gyroscopeY, setGyroscopeY] = useState('');
    const[gyroscopeZ, setGyroscopeZ] = useState('');
    const[lightIntensity, setLightIntensity] = useState('');
    const[uploaded, setUploaded] = useState(false);
    async function onSubmit(e) {
        e.preventDefault();
      
        const res = await fetch('http://localhost:3001/phoneData', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude, accelerometerX, accelerometerY, accelerometerZ, userAccelerometerX, userAccelerometerY, userAccelerometerZ, 
                gyroscopeX, gyroscopeY, gyroscopeZ, lightIntensity })
          });
          const data = await res.json();
      
          setUploaded(true);
      }

    //   'latitude' : Number,
	// 'longitude' : Number,
	// 'captureDate' : Date,
	// 'accelerometerX' : Number,
	// 'accelerometerY' : Number,
	// 'accelerometerZ' : Number,
	// 'userAccelerometerX' : Number,
	// 'userAccelerometerY' : Number,
	// 'userAccelerometerZ' : Number,
	// 'gyroscopeX' : Number,
	// 'gyroscopeY' : Number,
	// 'gyroscopeZ' : Number,
	// 'lightIntensity' : Number

    return (
         <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <label> Latitude:
            <input type="number" name="latitude" className="form-control" value={latitude} onChange={(e) => setLatitude(e.target.value)} required/>
            </label>
            <br />
            <label> Longitude:
            <input type="number" name="longitude" className="form-control" value={longitude} onChange={(e) => setLongitude(e.target.value)} required/>
            </label>
            <br />
            <label> accelerometerX:
            <input type="number" name="accelerometerX" className="form-control" value={accelerometerX} onChange={(e) => setAccelerometerX(e.target.value)} required/>
            </label>
            <br />
            <label> accelerometerY:
            <input type="number" name="accelerometerY" className="form-control" value={accelerometerY} onChange={(e) => setAccelerometerY(e.target.value)} required/>
            </label>
            <br />
            <label> accelerometerZ:
            <input type="number" name="accelerometerZ" className="form-control" value={accelerometerZ} onChange={(e) => setAccelerometerZ(e.target.value)} required/>
            </label>
            <br />
            <label> userAccelerometerX:
            <input type="number" name="userAccelerometerX" className="form-control" value={userAccelerometerX} onChange={(e) => setUserAccelerometerX(e.target.value)} required/>
            </label>
            <br />
            <label> userAccelerometerY:
            <input type="number" name="userAccelerometerY" className="form-control" value={userAccelerometerY} onChange={(e) => setUserAccelerometerY(e.target.value)} required/>
            </label>
            <br />
            <label> userAccelerometerZ:
            <input type="number" name="userAccelerometerZ" className="form-control" value={userAccelerometerZ} onChange={(e) => setUserAccelerometerZ(e.target.value)} required/>
            </label>
            <br />
            <label> gyroscopeX:
            <input type="number" name="gyroscopeX" className="form-control" value={gyroscopeX} onChange={(e) => setGyroscopeX(e.target.value)} required/>
            </label>
            <br />
            <label> gyroscopeY:
            <input type="number" name="gyroscopeY" className="form-control" value={gyroscopeY} onChange={(e) => setGyroscopeY(e.target.value)} required/>
            </label>
            <br />
            <label> gyroscopeZ:
            <input type="number" name="gyroscopeZ" className="form-control" value={gyroscopeZ} onChange={(e) => setGyroscopeZ(e.target.value)} required/>
            </label>
            <br />
            <label> lightIntensity:
            <input type="number" name="lightIntensity" className="form-control" value={lightIntensity} onChange={(e) => setLightIntensity(e.target.value)} required/>
            </label>
            <br /><br />
            <input className="btn btn-primary" type="submit" name="submit" value="Add Phone Data" />
       </form>
    )
}

export default AddPhoneData;