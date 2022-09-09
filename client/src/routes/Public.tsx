import { ROUTES_ENUM } from 'utils/constants/routes';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'context/authed-user-context';

interface RouteProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<RouteProps> = ({ children }: RouteProps) => {
  const location = useLocation();
  const { authedUser } = useAuth();

  return authedUser ? <Navigate to={ROUTES_ENUM.HOME} state={{ from: location }} replace /> : children;
};
