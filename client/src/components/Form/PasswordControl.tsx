import { forwardRef, Ref, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { EyeClosedIcon, EyeVisibleIcon } from 'components/Icons';

export type InputProps = {
  name: string;
  icon?: JSX.Element;
  placeholder?: string;
  errorMessage?: string;
};

export const PasswordControl = forwardRef(
  ({ name, icon, placeholder, errorMessage, ...rest }: InputProps, ref: Ref<HTMLInputElement>) => {
    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');

    const togglePasswordType = () => {
      setPasswordType(() => {
        return passwordType === 'password' ? 'text' : 'password';
      });
    };

    return (
      <FormControl key={name} isInvalid={!!errorMessage}>
        <InputGroup size='lg'>
          <InputLeftElement>{icon}</InputLeftElement>
          <Input id={name} ref={ref} type={passwordType} placeholder={placeholder} {...rest} />
          <InputRightElement onClick={togglePasswordType}>
            {passwordType === 'password' ? <EyeClosedIcon /> : <EyeVisibleIcon />}
          </InputRightElement>
        </InputGroup>
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  },
);
PasswordControl.displayName = 'PasswordControl';
