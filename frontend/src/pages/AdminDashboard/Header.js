// src/pages/AdminDashboard/Header.js
import React from 'react';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Perform logout logic (e.g., clearing tokens, redirecting to login page)
        console.log("Logged out");
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#333', boxShadow: 2 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin_Dashboard
                </Typography>


                {/* Profile/Avatar Menu */}
                <IconButton
                    color="inherit"
                    onClick={handleMenu}
                    sx={{ marginLeft: 2 }}
                >
                    <Avatar sx={{ bgcolor: '#1e88e5' }}>A</Avatar>
                </IconButton>

                {/* Menu with Logout option */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
