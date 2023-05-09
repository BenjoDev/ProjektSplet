import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoneData() {
    const userContext = useContext(UserContext); 
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[uploaded, setUploaded] = useState(false);
    async function onSubmit(e) {
        e.preventDefault();
      
        const res = await fetch('http://localhost:3001/phoneData', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
          });
          const data = await res.json();
      
          setUploaded(true);
      }

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
            <br /><br />
            <input className="btn btn-primary" type="submit" name="submit" value="Add Phone Data" />
       </form>
    )
}

export default AddPhoneData;