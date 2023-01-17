import { Icon, IconProps } from '@chakra-ui/react';

export const MinusRoundedIcon = ({ color, ...rest }: IconProps) => {
  return (
    <Icon
      w={6}
      h={6}
      color={color}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 512 512'
      xmlSpace='preserve'
      {...rest}
    >
      <g>
        <g>
          <path
            d='M256,0C114.844,0,0,114.844,0,256c0,141.156,114.844,256,256,256s256-114.844,256-256C512,114.844,397.156,0,256,0z
			 M256,490.667C126.604,490.667,21.333,385.397,21.333,256C21.333,126.606,126.604,21.333,256,21.333
			c129.396,0,234.667,105.272,234.667,234.667C490.667,385.397,385.396,490.667,256,490.667z'
          />
        </g>
      </g>
      <g>
        <g>
          <rect x='94.896' y='246.053' width='309.333' height='21.333' />
        </g>
      </g>
    </Icon>
  );
};
