import { ROUTES_ENUM } from 'utils/constants/routes';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'context/authed-user-context';
import { HomeLayout } from 'components/Layout';

interface RouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<RouteProps> = ({ children }: RouteProps) => {
  const { authedUser } = useAuth();
  const location = useLocation();

  return authedUser !== null ? (
    <HomeLayout>{children}</HomeLayout>
  ) : (
    <Navigate to={ROUTES_ENUM.LOGIN} state={{ from: location }} />
  );
};
