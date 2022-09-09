import { AtIcon, LockIcon, UserCardIcon } from 'components/Icons';
import { ForgotPasswordFormInput, LoginFormInput, RegisterFormInput, RestorePasswordFormInput } from 'types';

export interface BaseFieldsType<T> {
  name: keyof T;
  type: 'email' | 'text' | 'password' | 'checkbox';
  placeholder?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  defaultValue?: string | boolean;
}

const registerFields: BaseFieldsType<RegisterFormInput>[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Your email',
    icon: <AtIcon />,
  },
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    icon: <UserCardIcon />,
  },
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First name',
    icon: <UserCardIcon />,
  },
  {
    name: 'secondName',
    type: 'text',
    placeholder: 'Second name',
    icon: <UserCardIcon />,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Create password',
    icon: <LockIcon />,
  },
  {
    name: 'passwordConfirm',
    type: 'password',
    placeholder: 'Confirm your password',
    icon: <LockIcon />,
  },
];

const loginFields: BaseFieldsType<LoginFormInput>[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Your email',
    icon: <AtIcon />,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Your password',
    icon: <LockIcon />,
  },
  {
    name: 'remember',
    type: 'checkbox',
    placeholder: 'Remember me',
    defaultValue: true,
  },
];

const forgotPasswordFields: BaseFieldsType<ForgotPasswordFormInput>[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Your email',
    icon: <AtIcon />,
  },
];

const restorePasswordFields: BaseFieldsType<RestorePasswordFormInput>[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Your email',
    disabled: true,
    icon: <AtIcon />,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Create password',
    icon: <LockIcon />,
  },
  {
    name: 'passwordConfirm',
    type: 'password',
    placeholder: 'Confirm your password',
    icon: <LockIcon />,
  },
];

export { registerFields, loginFields, restorePasswordFields, forgotPasswordFields };
