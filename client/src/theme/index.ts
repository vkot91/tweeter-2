import {
  extendTheme,
  type ThemeConfig,
  theme as baseTheme,
  StyleFunctionProps,
  ComponentStyleConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
};

const colors = {
  primaryFontColor: {
    lightMode: baseTheme.colors.gray['700'],
    darkMode: baseTheme.colors.white,
  },
  secondaryFontColor: {
    lightMode: baseTheme.colors.gray['500'],
    darkMode: baseTheme.colors.gray['400'],
  },
  plainOldBlue: 'blue',
  bg: {
    light: {
      primary: 'white',
      secondary: 'rgba(0, 0, 0, 0.04)',
    },
    dark: {
      primary: '#191c21',
      secondary: '#212832',
    },
  },
};

const button: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'messenger',
  },
  baseStyle: ({ colorMode }: StyleFunctionProps) => ({
    _focus: { boxShadow: 'none' },
    color: colorMode === 'dark' ? colors.primaryFontColor.darkMode : colors.primaryFontColor.lightMode,
  }),
  variants: {
    outline: {
      color: 'gray.500',
    },
  },
};

const link: ComponentStyleConfig = {
  baseStyle: {
    color: 'blue.500',
    fontWeight: '500',
    _focus: { boxShadow: 'none' },
  },
  variants: {
    underlined: {
      color: 'gray.600',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    pure: {
      ':hover': {
        textDecoration: 'none',
        color: 'gray.600',
      },
    },
    menu: ({ colorMode }: StyleFunctionProps) => ({
      color: colorMode === 'dark' ? colors.primaryFontColor.darkMode : colors.primaryFontColor.lightMode,
    }),
  },
};

const input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      fontSize: 'md',
      _autofill: {
        border: '1px solid #E2E8F0',
        textFillColor: '#718096',
        boxShadow: '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      _dark: {
        _placeholder: {
          color: 'gray.300',
        },
      },
    },
  },
};

const avatar: ComponentStyleConfig = {
  baseStyle: {
    border: '1px solid blue',
  },
};

const text: ComponentStyleConfig = {
  baseStyle: ({ colorMode }: StyleFunctionProps) => ({
    color: colorMode === 'dark' ? colors.primaryFontColor.darkMode : colors.primaryFontColor.lightMode,
  }),
  variants: {
    secondary: ({ colorMode }: StyleFunctionProps) => ({
      margin: '0 !important',
      color: colorMode === 'dark' ? colors.secondaryFontColor.darkMode : colors.secondaryFontColor.lightMode,
    }),
  },
};

export const theme = extendTheme({
  layerStyles: {
    box: {
      borderRadius: '2xl',
      boxShadow: 'md',
      p: 5,
      bg: colors.bg.light.primary,
      '.chakra-ui-dark &': { bg: colors.bg.dark.primary },
    },
  },
  colors,
  styles: {
    global: ({ colorMode }: StyleFunctionProps) => ({
      body: {
        bg: colorMode === 'dark' ? 'bg.dark.primary' : 'bg.light.primary',
        lineHeight: 'base',
      },
    }),
  },
  config,
  components: {
    Text: text,
    Button: button,
    Link: link,
    Input: input,
    Avatar: avatar,
    Box: {
      bg: 'white',
    },
  },
});
