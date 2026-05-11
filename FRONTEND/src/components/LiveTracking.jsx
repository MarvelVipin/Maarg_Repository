import React, { useEffect, useState } from 'react'

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from 'react-leaflet'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

    iconUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

    shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Recenter map automatically
const RecenterMap = ({ position }) => {

    const map = useMap()

    useEffect(() => {

        map.setView(position, 16)

    }, [position])

    return null
}

const LiveTracking = () => {

    // Default position
    const [position, setPosition] = useState([28.6139, 77.2090])

    const [loading, setLoading] = useState(true)

    useEffect(() => {

    // Check browser support
    if (!navigator.geolocation) {

        alert('Geolocation is not supported')

        return
    }

    // Function to fetch location
    const updateLocation = () => {

        navigator.geolocation.getCurrentPosition(

            (location) => {

                const { latitude, longitude } = location.coords

                console.log(
                    "Updated Location:",
                    latitude,
                    longitude
                )

                setPosition([latitude, longitude])

                setLoading(false)
            },

            (error) => {

                console.log(error)
            },

            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        )
    }

    // Initial location fetch
    updateLocation()

    // Update every 6 seconds
    const interval = setInterval(() => {

        updateLocation()

    }, 6000)

    // Cleanup
    return () => {

        clearInterval(interval)
    }

}, [])

    // Loading screen
    if (loading) {

        return (
            <div className='h-screen flex items-center justify-center'>
                Loading live location...
            </div>
        )
    }

    return (

        <div className='h-screen w-full'>

            <MapContainer
                center={position}
                zoom={16}
                className='h-full w-full'
            >

                {/* OSM tiles */}
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Auto center */}
                <RecenterMap position={position} />

                {/* User marker */}
                <Marker position={position}>

                    <Popup>
                        Your Live Location
                    </Popup>

                </Marker>

            </MapContainer>

        </div>
    )
}

export default LiveTracking
