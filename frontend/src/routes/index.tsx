import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../features/home/HomePage';
import ExemploPage from '../features/exemplo/ExemploPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'exemplos', element: <ExemploPage /> },
    ],
  },
]);
