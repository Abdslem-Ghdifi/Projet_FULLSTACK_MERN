import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';

const DashboardStats = () => {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from backend
        const fetchStatsData = async () => {
            try {
                const response = await axios.get('/api/v1/admin/stats');
                setStats(response.data.stats);
                setChartData(response.data.chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats data', error);
                setLoading(false);
            }
        };

        fetchStatsData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (!stats || !chartData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">
                    Error loading data
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Dashboard Statistics
            </Typography>

            <Grid container spacing={3}>
                {/* Stats */}
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Total Users</Typography>
                        <Typography variant="h4">{stats.totalUsers}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Active Products</Typography>
                        <Typography variant="h4">{stats.activeProducts}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Pending Orders</Typography>
                        <Typography variant="h4">{stats.pendingOrders}</Typography>
                    </Paper>
                </Grid>

                {/* Chart */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Statistics Over Time
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                                <Line type="monotone" dataKey="products" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="orders" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardStats;
