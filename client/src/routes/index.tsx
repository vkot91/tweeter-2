import { NotFoundPage } from 'pages/NotFound';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, ROUTES_ENUM } from 'utils/constants/routes';
import { PrivateRoute } from './Private';
import { PublicRoute } from './Public';

export const Routes = () => {
  return (
    <RouterRoutes>
      {publicRoutes.paths.map((path) => (
        <Route key={path} path={path} element={<PublicRoute>{publicRoutes.element}</PublicRoute>} />
      ))}
      {privateRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
      ))}
      <Route path='/' element={<Navigate to={ROUTES_ENUM.HOME} />} />
      <Route
        path='*'
        element={
          <PrivateRoute>
            <NotFoundPage />
          </PrivateRoute>
        }
      />
    </RouterRoutes>
  );
};
