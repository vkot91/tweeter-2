export interface RegisterFormInput {
  email: string;
  username: string;
  firstName: string;
  secondName: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginFormInput {
  email: string;
  password: string;
  remember: boolean;
}

export interface RestorePasswordFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ForgotPasswordFormInput {
  email: string;
}
