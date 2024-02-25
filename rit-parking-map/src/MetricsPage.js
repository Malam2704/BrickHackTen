import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MetricsPage = () => {
    const [selectedDay, setSelectedDay] = useState('Monday');

    // Example data for a single day - extend this for different days as needed
    const data = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: 'Cars in Lot',
                data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 20)), // Simulated random data
                backgroundColor: 'rgba(55, 126, 247, 0.5)',
                borderColor: 'rgba(55, 126, 247, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
        // For demonstration, data generation is static. You can make it dynamic based on the day.
    };

    return (
        <Box sx={{ m: 4 }}>
            <Typography variant="h4" gutterBottom>
                Parking Lot Usage
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <Select value={selectedDay} onChange={handleDayChange}>
                    <MenuItem value="Monday">Monday</MenuItem>
                    {/* Add more days as needed */}
                </Select>
            </FormControl>
            <Bar data={data} options={options} />
        </Box>
    );
};

export default MetricsPage;
