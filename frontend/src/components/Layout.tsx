import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import { getNavGroups, getPageTitle } from './HomeNavigation';
import { useAuth } from '../hooks/useAuth';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user } = useAuth();
  const pageTitle = getPageTitle(location.pathname);
  const navGroups = getNavGroups(user?.role !== undefined ? String(user.role) : undefined);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar
        open={sidebarOpen}
        navGroups={navGroups}
        drawerWidth={DRAWER_WIDTH}
        collapsedWidth={COLLAPSED_WIDTH}
      />

      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        pageTitle={pageTitle}
        drawerWidth={DRAWER_WIDTH}
        collapsedWidth={COLLAPSED_WIDTH}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          overflow: 'auto',

        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
