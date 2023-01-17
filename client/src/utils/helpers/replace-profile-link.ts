import { ROUTES_ENUM } from 'utils/constants/routes';

export const replaceProfileLink = (username: string) => ROUTES_ENUM.PROFILE.replace(':username', username);
