import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline } from 'react-leaflet';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});
    const [phoneData, setPhoneData] = useState([]);

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    useEffect(() => {
        if (profile.username) {
            const fetchPhoneData = async () => {
                // console.log("fetch");
                // console.log("user " + profile.username);
                try {
                    const res = await fetch(`http://localhost:3001/phoneData/${profile.username}`);
                    const data = await res.json();
                    setPhoneData(data);
                } catch (error) {
                    console.error('Error fetching phone data:', error);
                }
            };

            fetchPhoneData();

            const interval = setInterval(fetchPhoneData, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [profile.username]);

    return (
        <div>
            <div class="p-3">
                {!userContext.user ? <Navigate replace to="/login" /> : ""}
                {/* <h1>User profile</h1> */}
                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
            </div>
            
            <div style={{ height: '74vh', width: '100vw' }}>
            <MapContainer center={[46.5547, 15.6466]} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                maxZoom={18}
                />
                {phoneData.map(item => {
                let color = 'gray';
                if (item.roadQuality === 0) {
                    color = 'green';
                } else if (item.roadQuality === 1) {
                    color = 'orange';
                } else if (item.roadQuality === 2) {
                    color = 'red';
                }

                return (
                    <Polyline
                    positions={[
                        [item.latitude_start, item.longitude_start],
                        [item.latitude_end, item.longitude_end]
                    ]}
                    pathOptions={{ color }}
                    />
                );
                })}
            </MapContainer>
            </div>
        </div>
    );
}

export default Profile;