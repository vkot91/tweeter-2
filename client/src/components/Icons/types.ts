import { IconProps as DefaultIconProps } from '@chakra-ui/react';
export interface IconProps extends DefaultIconProps {
  color?: string;
  styles?: {
    [key: string]: string;
  };
  filled?: boolean;
}
