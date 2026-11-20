import Box from '@mui/material/Box';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react';


function MapUpdater({center, zoom}) {
    const map = useMap();

    useEffect(() => {
        if(center) {
            map.setView(center, zoom)
        }
    }, [center, zoom, map])

    return null;
}

export default function Map(props) {


    const { markers = [], centerOfMap = [47.4454, 12.3922], zoom = 10 } = props;

    return (
        <div style={{ width: '100%', display: "flex", flexWrap: "wrap", gap: 1, height: "100%"}}>
            <MapContainer center={centerOfMap} zoom={zoom} style={{height: "100%", width: "100%"}}>
                <MapUpdater center={centerOfMap} zoom={zoom} />
                <TileLayer attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[
                            Number(marker.lat),
                            Number(marker.lon)
                        ]}>
                            <Popup>
                                {marker.name}
                            </Popup>
                        </Marker>
                ))}
            </MapContainer>
        </div>
    )
}