import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Inventory,
  TrendingUp,
  Warning,
  ShoppingCart,
} from '@mui/icons-material';
import productService from '../../services/productService';
import movementService from '../../services/movementService';
import notificationService from '../../services/notificationService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    recentMovements: 0,
    unreadNotifications: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentMovements, setRecentMovements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [productsData, lowStockData, movementsData, notifCount] = await Promise.all([
        productService.getAllProducts(0, 1),
        productService.getLowStockProducts(0, 5),
        movementService.getAllMovements(0, 5),
        notificationService.getUnreadCount(),
      ]);

      setStats({
        totalProducts: productsData.totalElements || 0,
        lowStock: lowStockData.totalElements || 0,
        recentMovements: movementsData.totalElements || 0,
        unreadNotifications: notifCount || 0,
      });

      setLowStockProducts(lowStockData.content || []);
      setRecentMovements(movementsData.content || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card sx={{ cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Productos"
            value={stats.totalProducts}
            icon={<Inventory sx={{ color: 'white' }} />}
            color="primary.main"
            onClick={() => navigate('/products')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Stock Bajo"
            value={stats.lowStock}
            icon={<Warning sx={{ color: 'white' }} />}
            color="warning.main"
            onClick={() => navigate('/low-stock')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Movimientos"
            value={stats.recentMovements}
            icon={<TrendingUp sx={{ color: 'white' }} />}
            color="success.main"
            onClick={() => navigate('/movements')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Notificaciones"
            value={stats.unreadNotifications}
            icon={<ShoppingCart sx={{ color: 'white' }} />}
            color="info.main"
            onClick={() => navigate('/notifications')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Productos con Stock Bajo
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {lowStockProducts.length === 0 ? (
                <Typography color="textSecondary" align="center">
                  No hay productos con stock bajo
                </Typography>
              ) : (
                lowStockProducts.map((product) => (
                  <ListItem
                    key={product.id}
                    button
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <ListItemText
                      primary={product.name}
                      secondary={`Stock: ${product.stock} / Mínimo: ${product.minStock}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Movimientos Recientes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recentMovements.length === 0 ? (
                <Typography color="textSecondary" align="center">
                  No hay movimientos recientes
                </Typography>
              ) : (
                recentMovements.map((movement) => (
                  <ListItem key={movement.id}>
                    <ListItemText
                      primary={movement.productName}
                      secondary={`${movement.type} - Cantidad: ${movement.quantity}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;