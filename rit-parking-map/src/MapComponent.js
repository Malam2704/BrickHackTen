import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import parkingData from './parkingData.json'; // Adjust the path as needed
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './App.css'; // Ensure you have this if you're storing custom styles here
import { Box, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import ParkingLotDetail from './ParkingLotDetail'
import parkingLotsData from './parkingLotsData.json';


// const ritBounds = [
//     [43.0826, -77.6802], // Southwest coordinates
//     [43.0869, -77.6696]  // Northeast coordinates
// ];

// Component to restrict map view, placed inside MapComponent to access useMap
// const SetViewToBounds = () => {
//     const map = useMap();
//     map.setMaxBounds(ritBounds);
//     return null;
// };

const MapComponent = () => {
    const [parkingLots, setParkingLots] = useState([]);
    const [showPercentage, setShowPercentage] = useState(false);
    const [selectedLotId, setSelectedLotId] = useState(null);
    const [detailPopupOpen, setDetailPopupOpen] = useState(false);


    useEffect(() => {
        setParkingLots(parkingData.parkingLots);
    }, []);

    const createCustomMarker = (availableSpots, totalSpots) => {
        const percentage = Math.round((availableSpots / totalSpots) * 100);
        const displayText = showPercentage ? `${percentage}%` : availableSpots;
        const color = availableSpots > 0 ? blue[500] : 'red'; // Blue for available, red for full

        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${color}; color: white; font-weight: bold; font-size: 16px; padding: 6px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-family: 'Roboto', sans-serif;">
                ${displayText}
             </div>`,
            iconSize: [50, 50],
            iconAnchor: [25, 25],
        });
    };

    const onLotClick = (lotId) => {
        console.log(`Parking lot ${lotId} was clicked`);
        setSelectedLotId(lotId);
        setDetailPopupOpen(true); // Open the details popup
    };

    const handleCloseDetailPopup = () => {
        setDetailPopupOpen(false);
    };


    return (
        <div>
            <MapContainer center={[43.0848, -77.6744]} zoom={16} style={{ height: '94vh', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <SetViewToBounds /> */}
                {parkingLots.map(lot => (
                    <Marker
                        key={lot.id}
                        position={lot.coordinates}
                        icon={createCustomMarker(lot.availableSpots, lot.totalSpots)}
                        eventHandlers={{
                            click: () => onLotClick(lot.id),
                        }}
                    />
                ))}
            </MapContainer>
            <Box sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: 3, // Adjust shadow to your preference
            }}>
                <FormControlLabel
                    control={<Switch
                        checked={showPercentage}
                        onChange={(e) => setShowPercentage(e.target.checked)}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#F76902',
                                '&:hover': {
                                    backgroundColor: 'rgba(247,105,2,0.08)', // Adjust hover state color as needed
                                },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#F76902',
                            },
                        }}
                    />
                    }
                    label={<Typography sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}> {showPercentage ? "Percentage" : "Number"} </Typography>}
                    sx={{ m: 0, p: 0, '& .MuiTypography-root': { flexGrow: 1 } }}
                />
            </Box>
            <ParkingLotDetail
                selectedLotId={selectedLotId}
                parkingLots={parkingLotsData}
                open={detailPopupOpen}
                onClose={handleCloseDetailPopup}
            />
        </div>
    );
};

export default MapComponent;
