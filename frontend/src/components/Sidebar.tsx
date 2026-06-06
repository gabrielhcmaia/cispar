import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { NavLink, useLocation } from 'react-router-dom';
import type { NavItem, NavGroup, SidebarProps } from './SidebarTypes';

const BG = '#0D0B2A';
const ACTIVE_BG = '#1E1A4A';
const HOVER_BG = 'rgba(255,255,255,0.06)';
const TEXT_MUTED = 'rgba(255,255,255,0.55)';
const TEXT_NORMAL = 'rgba(255,255,255,0.85)';
const TEXT_ACTIVE = '#FFFFFF';
const ICON_COLOR = 'rgba(255,255,255,0.65)';
const GROUP_LABEL_COLOR = 'rgba(255,255,255,0.38)';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

function ExpandableItem({
  item,
  sidebarOpen,
  currentPath,
}: {
  item: NavItem;
  sidebarOpen: boolean;
  currentPath: string;
}) {
  const isAnyChildActive = item.children?.some((c) => currentPath === c.path) ?? false;
  const [expanded, setExpanded] = useState(isAnyChildActive);

  return (
    <>
      <ListItemButton
        onClick={() => setExpanded((v) => !v)}
        sx={{
          minHeight: 44,
          px: 2,
          mx: 1,
          borderRadius: '8px',
          mb: 0.25,
          color: isAnyChildActive ? TEXT_ACTIVE : TEXT_NORMAL,
          backgroundColor: isAnyChildActive ? ACTIVE_BG : 'transparent',
          '&:hover': { backgroundColor: HOVER_BG },
          justifyContent: sidebarOpen ? 'initial' : 'center',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: sidebarOpen ? 1.5 : 'auto',
            color: isAnyChildActive ? TEXT_ACTIVE : ICON_COLOR,
            '& svg': { fontSize: '1.15rem' },
          }}
        >
          {item.icon}
        </ListItemIcon>
        {sidebarOpen && (
          <>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: isAnyChildActive ? 600 : 400,
              }}
              sx={{ my: 0 }}
            />
            <ExpandLessIcon
              sx={{
                fontSize: '1rem',
                color: TEXT_MUTED,
                transition: 'transform 0.2s',
                transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            />
          </>
        )}
      </ListItemButton>

      {sidebarOpen && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ pl: 1 }}>
            {item.children?.map((child) => {
              const isActive = currentPath === child.path;
              return (
                <ListItem key={child.path} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={child.path}
                    sx={{
                      minHeight: 38,
                      px: 2,
                      mx: 1,
                      borderRadius: '8px',
                      mb: 0.25,
                      color: isActive ? TEXT_ACTIVE : TEXT_NORMAL,
                      backgroundColor: isActive ? ACTIVE_BG : 'transparent',
                      textDecoration: 'none',
                      '&:hover': { backgroundColor: HOVER_BG },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 1.5,
                        color: isActive ? TEXT_ACTIVE : ICON_COLOR,
                        '& svg': { fontSize: '1rem' },
                      }}
                    >
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={child.label}
                      primaryTypographyProps={{
                        fontSize: '0.8125rem',
                        fontWeight: isActive ? 600 : 400,
                      }}
                      sx={{ my: 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default function Sidebar({
  open,
  navGroups,
  drawerWidth = DRAWER_WIDTH,
  collapsedWidth = COLLAPSED_WIDTH,
}: SidebarProps) {
  const location = useLocation();
  const width = open ? drawerWidth : collapsedWidth;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: (t) =>
          t.transitions.create('width', {
            easing: t.transitions.easing.sharp,
            duration: open ? t.transitions.duration.enteringScreen : t.transitions.duration.leavingScreen,
          }),
        '& .MuiDrawer-paper': {
          width,
          overflowX: 'hidden',
          border: 'none',
          transition: (t) =>
            t.transitions.create('width', {
              easing: t.transitions.easing.sharp,
              duration: open ? t.transitions.duration.enteringScreen : t.transitions.duration.leavingScreen,
            }),
          backgroundColor: BG,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 2.5,
          minHeight: 72,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            backgroundColor: '#fff',
            color: BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            flexShrink: 0,
          }}
        >
          C
        </Box>
        {open && (
          <Box>
            <Typography
              sx={{
                fontWeight: 250,
                fontSize: '1rem',
                lineHeight: 1.2,
                color: '#ffffff',
                letterSpacing: '0.02em',
              }}
            >
              CISPAR
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6rem',
                color: TEXT_MUTED,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                lineHeight: 1.4,
              }}
            >
              GESTÃO DE POÇOS
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1, pb: 2 }}>
        {navGroups.map((group, gi) => (
          <Box key={gi} sx={{ mb: 1 }}>
            {open && group.groupLabel && (
              <Typography
                sx={{
                  px: 3,
                  pt: gi === 0 ? 0.5 : 2,
                  pb: 0.75,
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: GROUP_LABEL_COLOR,
                }}
              >
                {group.groupLabel}
              </Typography>
            )}

            <List disablePadding>
              {group.items.map((item) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                      <Tooltip title={!open ? item.label : ''} placement="right" arrow>
                        <Box>
                          <ExpandableItem
                            item={item}
                            sidebarOpen={open}
                            currentPath={location.pathname}
                          />
                        </Box>
                      </Tooltip>
                    </ListItem>
                  );
                }

                const isActive = location.pathname === item.path;
                return (
                  <ListItem key={item.path ?? item.label} disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={!open ? item.label : ''} placement="right" arrow>
                      <ListItemButton
                        component={NavLink}
                        to={item.path ?? '/'}
                        sx={{
                          minHeight: 44,
                          px: 2,
                          mx: 1,
                          borderRadius: '8px',
                          mb: 0.25,
                          color: isActive ? TEXT_ACTIVE : TEXT_NORMAL,
                          backgroundColor: isActive ? ACTIVE_BG : 'transparent',
                          textDecoration: 'none',
                          justifyContent: open ? 'initial' : 'center',
                          '&:hover': { backgroundColor: HOVER_BG },
                          '&.active': {
                            backgroundColor: ACTIVE_BG,
                            color: TEXT_ACTIVE,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 1.5 : 'auto',
                            color: isActive ? TEXT_ACTIVE : ICON_COLOR,
                            '& svg': { fontSize: '1.15rem' },
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {open && (
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: isActive ? 600 : 400,
                            }}
                            sx={{ my: 0 }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}