import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'

const Pin = ({ item }) => {

    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup className="flex w-max max-w-72">
                <div className="flex w-full gap-2 max-w-72 truncate">
                    <img src={item.images[0]} alt={item.images[0]} className="rounded-md w-16 object-cover" />
                    <div className="flex flex-col max-w-72">
                        <Link to={`/${item.id}`} className="w-max">{item.title}</Link>
                        <span>{item.bedroom} Bedrooms</span>
                        <b>$ {item.price.toLocaleString()}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}

export default Pin