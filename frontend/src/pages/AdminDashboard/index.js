// src/pages/AdminDashboard/index.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardStats from './DashboardStats';
import { Box, CssBaseline, Grid, Container } from '@mui/material';



const AdminDashboard = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Sidebar Component */}
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3
                 }}>
                {/* Header Component */}
                <Header />
                
                {/* Dashboard Stats - You can display various stats or cards here */}
                <Container maxWidth="xl" sx={{ padding: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <DashboardStats /> 
                        </Grid>
                        
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
