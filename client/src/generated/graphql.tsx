import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type CreatePostInput = {
  description: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
  secondName: Scalars['String'];
  username: Scalars['String'];
};

export type GetUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirm?: Maybe<Scalars['Boolean']>;
  createPost: Post;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  login: UserResponse;
  register: User;
  removePost: Scalars['Boolean'];
  removeUser?: Maybe<User>;
  restorePassword: UserResponse;
  updatePost: Post;
  updateUser: User;
};


export type MutationConfirmArgs = {
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemovePostArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationRestorePasswordArgs = {
  restorePasswordInput: RestorePasswordInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  totalCount: Scalars['Int'];
};

export type PaginationPostsInput = {
  activePage?: InputMaybe<Scalars['Int']>;
  ownerId: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  owner: User;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post?: Maybe<Post>;
  posts: PaginatedPostsResponse;
  user: User;
  users: Array<Maybe<User>>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  paginationPostsInput?: InputMaybe<PaginationPostsInput>;
};


export type QueryUserArgs = {
  getUserInput?: InputMaybe<GetUserInput>;
};

export type RestorePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdatePostInput = {
  description?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['Int'];
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  secondName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  isEmailConfirmed?: Maybe<Scalars['Boolean']>;
  password: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  secondName: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ConfirmMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmMutation = { __typename?: 'Mutation', confirm?: boolean | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: boolean | null };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', token?: string | null, user?: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } | null } };

export type RegisterMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } };

export type RestorePasswordMutationVariables = Exact<{
  restorePasswordInput: RestorePasswordInput;
}>;


export type RestorePasswordMutation = { __typename?: 'Mutation', restorePassword: { __typename?: 'UserResponse', token?: string | null, user?: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } };

export type RegularPostFragment = { __typename?: 'Post', id: number, description: string, image?: string | null, createdAt: string, updatedAt?: string | null, owner: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, description: string, image?: string | null, createdAt: string, updatedAt?: string | null, owner: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } } };

export type RemovePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: boolean };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number, description: string, image?: string | null, createdAt: string, updatedAt?: string | null, owner: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } } };

export type PostsQueryVariables = Exact<{
  paginationPostsInput: PaginationPostsInput;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPostsResponse', totalCount: number, hasMore: boolean, items: Array<{ __typename?: 'Post', id: number, description: string, image?: string | null, createdAt: string, updatedAt?: string | null, owner: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } }> } };

export type UserQueryVariables = Exact<{
  getUserInput?: InputMaybe<GetUserInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, username: string, password: string, email: string, firstName: string, secondName: string, bio?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null } };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  password
  email
  firstName
  secondName
  bio
  avatar
  isEmailConfirmed
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  description
  image
  createdAt
  updatedAt
  owner {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const ConfirmDocument = gql`
    mutation Confirm($token: String!) {
  confirm(token: $token)
}
    `;
export type ConfirmMutationFn = Apollo.MutationFunction<ConfirmMutation, ConfirmMutationVariables>;

/**
 * __useConfirmMutation__
 *
 * To run a mutation, you first call `useConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmMutation, { data, loading, error }] = useConfirmMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmMutation, ConfirmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmMutation, ConfirmMutationVariables>(ConfirmDocument, options);
      }
export type ConfirmMutationHookResult = ReturnType<typeof useConfirmMutation>;
export type ConfirmMutationResult = Apollo.MutationResult<ConfirmMutation>;
export type ConfirmMutationOptions = Apollo.BaseMutationOptions<ConfirmMutation, ConfirmMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($createUserInput: CreateUserInput!) {
  register(createUserInput: $createUserInput) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RestorePasswordDocument = gql`
    mutation RestorePassword($restorePasswordInput: RestorePasswordInput!) {
  restorePassword(restorePasswordInput: $restorePasswordInput) {
    token
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type RestorePasswordMutationFn = Apollo.MutationFunction<RestorePasswordMutation, RestorePasswordMutationVariables>;

/**
 * __useRestorePasswordMutation__
 *
 * To run a mutation, you first call `useRestorePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestorePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restorePasswordMutation, { data, loading, error }] = useRestorePasswordMutation({
 *   variables: {
 *      restorePasswordInput: // value for 'restorePasswordInput'
 *   },
 * });
 */
export function useRestorePasswordMutation(baseOptions?: Apollo.MutationHookOptions<RestorePasswordMutation, RestorePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestorePasswordMutation, RestorePasswordMutationVariables>(RestorePasswordDocument, options);
      }
export type RestorePasswordMutationHookResult = ReturnType<typeof useRestorePasswordMutation>;
export type RestorePasswordMutationResult = Apollo.MutationResult<RestorePasswordMutation>;
export type RestorePasswordMutationOptions = Apollo.BaseMutationOptions<RestorePasswordMutation, RestorePasswordMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const RemovePostDocument = gql`
    mutation RemovePost($id: Int!) {
  removePost(id: $id)
}
    `;
export type RemovePostMutationFn = Apollo.MutationFunction<RemovePostMutation, RemovePostMutationVariables>;

/**
 * __useRemovePostMutation__
 *
 * To run a mutation, you first call `useRemovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostMutation, { data, loading, error }] = useRemovePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePostMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument, options);
      }
export type RemovePostMutationHookResult = ReturnType<typeof useRemovePostMutation>;
export type RemovePostMutationResult = Apollo.MutationResult<RemovePostMutation>;
export type RemovePostMutationOptions = Apollo.BaseMutationOptions<RemovePostMutation, RemovePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePostInput) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const PostsDocument = gql`
    query Posts($paginationPostsInput: PaginationPostsInput!) {
  posts(paginationPostsInput: $paginationPostsInput) {
    items {
      ...RegularPost
    }
    totalCount
    hasMore
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      paginationPostsInput: // value for 'paginationPostsInput'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserDocument = gql`
    query User($getUserInput: GetUserInput) {
  user(getUserInput: $getUserInput) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      getUserInput: // value for 'getUserInput'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export type MutationKeySpecifier = ('confirm' | 'createPost' | 'forgotPassword' | 'login' | 'register' | 'removePost' | 'removeUser' | 'restorePassword' | 'updatePost' | 'updateUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	confirm?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	removePost?: FieldPolicy<any> | FieldReadFunction<any>,
	removeUser?: FieldPolicy<any> | FieldReadFunction<any>,
	restorePassword?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePost?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedPostsResponseKeySpecifier = ('hasMore' | 'items' | 'totalCount' | PaginatedPostsResponseKeySpecifier)[];
export type PaginatedPostsResponseFieldPolicy = {
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('createdAt' | 'description' | 'id' | 'image' | 'owner' | 'updatedAt' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('me' | 'post' | 'posts' | 'user' | 'users' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('avatar' | 'bio' | 'email' | 'firstName' | 'id' | 'isEmailConfirmed' | 'password' | 'posts' | 'secondName' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isEmailConfirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	secondName?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserResponseKeySpecifier = ('token' | 'user' | UserResponseKeySpecifier)[];
export type UserResponseFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PaginatedPostsResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedPostsResponseKeySpecifier | (() => undefined | PaginatedPostsResponseKeySpecifier),
		fields?: PaginatedPostsResponseFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier),
		fields?: UserResponseFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;