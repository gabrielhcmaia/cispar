import React from 'react';

export interface SubNavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: SubNavItem[];
}

export interface NavGroup {
  groupLabel?: string;
  items: NavItem[];
}

export interface SidebarProps {
  open: boolean;
  navGroups: NavGroup[];
  drawerWidth?: number;
  collapsedWidth?: number;
}
