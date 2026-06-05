import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import OpacityIcon from '@mui/icons-material/Opacity';
import BuildIcon from '@mui/icons-material/Build';
import InventoryIcon from '@mui/icons-material/Inventory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LabelIcon from '@mui/icons-material/Label';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import type { NavGroup } from './Sidebar';

export function getNavGroups(role?: string): NavGroup[] {
  const isAdmin = role === 'ROLE_ADMIN';

  return [
  {
    groupLabel: 'Menu Principal',
    items: [
      { label: 'Dashboard',    path: '/',            icon: <DashboardIcon /> },
      ...(isAdmin ? [{ label: 'Usuários', path: '/users', icon: <PeopleIcon /> }] : []),
      { label: 'Login',        path: '/login',       icon: <LoginIcon /> },
      { label: 'Poços',        path: '/wells',       icon: <OpacityIcon /> },
      { label: 'Equipamentos', path: '/equipment',   icon: <BuildIcon /> },
      { label: 'Manutenções',  path: '/maintenance', icon: <InventoryIcon /> },
    ],
  },
  {
    groupLabel: 'Cadastros',
    items: [
      {
        label: 'Cadastros Base',
        icon: <FormatListBulletedIcon />,
        children: [
          { label: 'Técnicos',           path: '/base/technicians', icon: <EngineeringIcon /> },
          { label: 'Fornecedores',       path: '/base/suppliers',   icon: <LocalShippingIcon /> },
          { label: 'Marcas',             path: '/base/brands',      icon: <LabelIcon /> },
          { label: 'Unidades de Medida', path: '/base/units',       icon: <StraightenIcon /> },
          { label: 'Cidades / Região',   path: '/base/regions',     icon: <LocationOnIcon /> },
        ],
      },
      {
        label: 'Relatórios',
        icon: <AssessmentIcon />,
        children: [
          { label: 'Visão Geral',  path: '/reports/overview',   icon: <AssessmentIcon /> },
          { label: 'Manutenções',  path: '/reports/maintenance', icon: <SummarizeIcon /> },
          { label: 'Poços',        path: '/reports/wells',       icon: <OpacityIcon /> },
          { label: 'Equipamentos', path: '/reports/equipment',   icon: <BuildIcon /> },
        ],
      },
    ],
  },
  ];
}

// Mantido para compatibilidade — preferir getNavGroups(role) quando possível
export const navGroups = getNavGroups();

export const pageTitles: Record<string, string> = {
  '/':                      'Dashboard',
  '/users':                 'Usuários',
  '/login':                 'Login',
  '/wells':                 'Poços',
  '/equipment':             'Equipamentos',
  '/maintenance':           'Manutenções',
  '/base/technicians':      'Técnicos',
  '/base/suppliers':        'Fornecedores',
  '/base/brands':           'Marcas',
  '/base/units':            'Unidades de Medida',
  '/base/regions':          'Cidades / Região',
  '/reports/overview':      'Visão Geral',
  '/reports/maintenance':   'Relatórios de Manutenções',
  '/reports/wells':         'Relatórios de Poços',
  '/reports/equipment':     'Relatórios de Equipamentos',
};

export function getPageTitle(pathname: string): string {
  return pageTitles[pathname] ?? 'CISPAR';
}
