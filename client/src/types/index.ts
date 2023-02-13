import { GetPostsActionType, Status } from 'generated/graphql';

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

export interface UpdateUserFormInput {
  firstName?: string;
  secondName?: string;
  username?: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: File;
}

export interface BaseFieldsType<T> {
  name: keyof T;
  type: 'email' | 'text' | 'password' | 'checkbox' | 'textarea' | 'phone';
  placeholder?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  defaultValue?: string | boolean;
  label?: string;
}

export interface FriendshipFromRequest {
  __typename?: 'Friendship';
  id?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  status?: Status | null;
  friend?: {
    __typename?: 'User';
    id: number;
    firstName: string;
    secondName: string;
    username: string;
    avatar?: string | null;
  } | null;
}

export type GetPostsActions = GetPostsActionType;

export enum ToastTypes {
  NewFriendRequest,
  PostLike,
  PostShare,
  PostComment,
  FriendRequestAccepted,
}
