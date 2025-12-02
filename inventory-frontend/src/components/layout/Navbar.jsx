import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import notificationService from '../../services/notificationService';
import websocketService from '../../services/websocketService';

const Navbar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadUnreadCount();
    
    websocketService.connect(
      () => {
        console.log('WebSocket connected in Navbar');
        websocketService.subscribeToNotifications((notification) => {
          setUnreadCount((prev) => prev + 1);
          setNotifications((prev) => [notification, ...prev]);
        });
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const loadUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenu = async (event) => {
    setNotifAnchorEl(event.currentTarget);
    try {
      const data = await notificationService.getUnreadNotifications(0, 5);
      setNotifications(data.content || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleNotificationClick = async (notif) => {
    try {
      await notificationService.markAsRead(notif.id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
      handleNotifClose();
      navigate('/notifications');
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Inventario
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleNotifMenu}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifClose}
            PaperProps={{
              style: {
                maxHeight: 400,
                width: '350px',
              },
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem>No hay notificaciones</MenuItem>
            ) : (
              notifications.map((notif) => (
                <MenuItem
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                >
                  <Box>
                    <Typography variant="subtitle2">{notif.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notif.message}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>

          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>
              <Typography variant="body2">{user?.sub}</Typography>
            </MenuItem>
            <MenuItem onClick={handleProfile}>Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;