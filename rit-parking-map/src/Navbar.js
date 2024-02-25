import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import ritLogo from 'assets/ritlogo.png';
import ritLogo from './assets/ritlogo.png';

const Navbar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#F76902', height: '6vh' }}>
            <Toolbar>
                <img src={ritLogo} alt="RIT Logo" style={{ marginRight: '10px', height: '100px' }} />
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Parkalytics
                    </Link>
                </Typography>
                <nav>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Button color="inherit">About</Button>
                    </Link>
                    <Link to="/support" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Button color="inherit">Support</Button>
                    </Link>
                    <Link to="/metrics" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Button color="inherit">Metrics</Button>
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
