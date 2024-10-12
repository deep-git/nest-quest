import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from './Pin';

const Map = ({ posts }) => {

    return (
        <MapContainer center={posts.length === 1 ? [posts[0].latitude, posts[0].longitude] : [37, -100]} zoom={posts.length === 1 ? 7 : 3} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {posts.map((post) => (
                <Pin key={post.id} item={post} />
            ))}
        </MapContainer>
    )
}

export default Map