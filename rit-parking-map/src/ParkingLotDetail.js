import React from 'react';
import { Dialog, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ParkingLotDetail = ({ selectedLotId, parkingLots, open, onClose }) => {
    const selectedLot = parkingLots.find(lot => lot.id === selectedLotId);

    // Define the grid styles here for clarity and reusability
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', // Adjust based on your preference
        gap: '2px', // Very small gap between items
        padding: '16px',
        backgroundColor: 'white', // Ensuring the background is white for better usability
    };

    const spotStyle = (isAvailable) => ({
        width: '100%', // Take up all available space in the grid cell
        height: '40px', // Fixed height for each spot
        backgroundColor: isAvailable ? 'limegreen' : 'red', // Green for available, red for unavailable
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: '4px',
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                    {selectedLot ? selectedLot.name : 'Loading...'}
                </Typography>
                <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box sx={gridStyle}>
                {selectedLot && selectedLot.spots.map((spot, index) => (
                    <Box key={index} sx={spotStyle(spot.isAvailable)}>
                        {/* Optional: Display spot ID or number */}
                    </Box>
                ))}
            </Box>
        </Dialog>
    );
};

export default ParkingLotDetail;
