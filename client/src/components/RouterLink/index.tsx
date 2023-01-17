import { Link, LinkProps } from '@chakra-ui/react';
import { To } from 'react-router-dom';

interface Props extends LinkProps {
  children: JSX.Element;
  to: To;
}
export const RouterLink = ({ children, to, variant = 'underlined' }: Props) => {
  return (
    <Link variant={variant} as={RouterLink} to={to}>
      {children}
    </Link>
  );
};
