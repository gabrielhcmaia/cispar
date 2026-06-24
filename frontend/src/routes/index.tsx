import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../features/home/HomePage';
import { LoginPage } from '../features/auth/LoginPage';
import { PrivateRoute } from '../components/PrivateRoute';
import UsersPage from '../features/users/UsersPage';
import TecnicosPage from '../features/base/technicians/TecnicosPage';
import UnidadesPage from '../features/base/units/UnidadesPage';
import FornecedoresPage from '../features/base/suppliers/FornecedoresPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'base/technicians', element: <TecnicosPage /> },
          { path: 'base/units', element: <UnidadesPage /> },
          { path: 'base/suppliers', element: <FornecedoresPage /> },
        ],
      },
    ],
  },
]);
