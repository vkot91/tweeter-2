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
  Date: any;
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  checked: Scalars['Boolean'];
  id: Scalars['Int'];
  owner: User;
  ownerId: Scalars['Int'];
  post: Post;
  text: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type CreateCommentInput = {
  postId: Scalars['Int'];
  text: Scalars['String'];
};

export type CreateFriendshipInput = {
  friend_id: Scalars['Int'];
};

export type CreateMessageInput = {
  roomId: Scalars['Int'];
  text: Scalars['String'];
};

export type CreatePostInput = {
  description: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
};

export type CreateRoomInput = {
  participantId: Scalars['Int'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
  secondName: Scalars['String'];
  username: Scalars['String'];
};

export type Friendship = {
  __typename?: 'Friendship';
  attemptsCount: Scalars['Int'];
  friend: User;
  friend_id: Scalars['Int'];
  id: Scalars['Int'];
  requestCreator: Scalars['Boolean'];
  requestCreatorInfo?: Maybe<User>;
  status: Status;
  updatedAt: Scalars['Date'];
};

export type FriendshipMutatedPayload = {
  __typename?: 'FriendshipMutatedPayload';
  mutation: FriendshipMutationType;
  node: Friendship;
};

export enum FriendshipMutationType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

export enum GetPostsActionType {
  All = 'all',
  Friends = 'friends',
  Owner = 'owner'
}

export type GetUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  checked: Scalars['Boolean'];
  id: Scalars['Int'];
  owner: User;
  ownerId: Scalars['Int'];
  post: Post;
  updatedAt: Scalars['Date'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  owner: User;
  ownerId: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirm?: Maybe<Scalars['Boolean']>;
  createComment: Comment;
  createFriendship: Friendship;
  createLike: Like;
  createMessage: Message;
  createPost: Post;
  createRoom: Room;
  createShare: Share;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  login: UserResponse;
  register: User;
  removeComment?: Maybe<Scalars['Boolean']>;
  removeFriendship: Friendship;
  removeLike: Scalars['Boolean'];
  removeMessage: Scalars['Boolean'];
  removePost: Scalars['Boolean'];
  removeRoom: Scalars['Boolean'];
  removeShare: Scalars['Boolean'];
  removeUser?: Maybe<User>;
  restorePassword: UserResponse;
  updateCreator: Friendship;
  updateMessage: Message;
  updatePost: Post;
  updateReaction: Scalars['Boolean'];
  updateStatus: Scalars['Boolean'];
  updateUser: User;
};


export type MutationConfirmArgs = {
  token: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateFriendshipArgs = {
  createFriendshipInput: CreateFriendshipInput;
};


export type MutationCreateLikeArgs = {
  postId: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput;
};


export type MutationCreateShareArgs = {
  postId: Scalars['Int'];
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


export type MutationRemoveCommentArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveFriendshipArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveLikeArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePostArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveShareArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationRestorePasswordArgs = {
  restorePasswordInput: RestorePasswordInput;
};


export type MutationUpdateCreatorArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateMessageArgs = {
  updateMessageInput: UpdateMessageInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateReactionArgs = {
  updateReactionInput: UpdateReactionInput;
};


export type MutationUpdateStatusArgs = {
  updateStatusInput: UpdateStatusInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  nodes?: Maybe<Array<Maybe<NotificationNode>>>;
  type?: Maybe<NotificationType>;
};

export type NotificationNode = Comment | Friendship | Like | Share;

export enum NotificationType {
  Comment = 'Comment',
  Friendship = 'Friendship',
  Like = 'Like',
  Share = 'Share'
}

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  totalCount: Scalars['Int'];
};

export type PaginationPostsInput = {
  action?: InputMaybe<GetPostsActionType>;
  activePage?: InputMaybe<Scalars['Int']>;
  ownerId: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
};

export type Payload = {
  __typename?: 'Payload';
  user?: Maybe<User>;
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Comment>>;
  description: Scalars['String'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Like>>;
  owner: User;
  shares?: Maybe<Array<Share>>;
  updatedAt: Scalars['Date'];
};

export type PostMutatedNode = Comment | Like | Share;

export type PostMutatedPayload = {
  __typename?: 'PostMutatedPayload';
  mutation: PostMutationType;
  node: PostMutatedNode;
};

export enum PostMutationType {
  CommentCreated = 'COMMENT_CREATED',
  CommentDeleted = 'COMMENT_DELETED',
  LikeCreated = 'LIKE_CREATED',
  LikeDeleted = 'LIKE_DELETED',
  ShareCreated = 'SHARE_CREATED',
  ShareDeleted = 'SHARE_DELETED'
}

export type Query = {
  __typename?: 'Query';
  friendsRequests: Array<Maybe<Friendship>>;
  friendships?: Maybe<Array<Maybe<Friendship>>>;
  me: User;
  message?: Maybe<Message>;
  messages: Array<Maybe<Message>>;
  notifications: Array<Maybe<Notification>>;
  post?: Maybe<Post>;
  posts: PaginatedPostsResponse;
  room?: Maybe<Room>;
  rooms: Array<Maybe<Room>>;
  user: User;
  users: Array<Maybe<User>>;
};


export type QueryFriendshipsArgs = {
  userId: Scalars['Int'];
};


export type QueryMessageArgs = {
  id: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  paginationPostsInput?: InputMaybe<PaginationPostsInput>;
};


export type QueryRoomArgs = {
  participantId: Scalars['Int'];
};


export type QueryUserArgs = {
  getUserInput?: InputMaybe<GetUserInput>;
};

export enum ReactionEntities {
  Comment = 'Comment',
  Like = 'Like',
  Share = 'Share'
}

export type RestorePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['Int'];
  messages: Array<Maybe<Message>>;
  participants: Array<Maybe<User>>;
  updatedAt: Scalars['Date'];
};

export type Share = {
  __typename?: 'Share';
  checked: Scalars['Boolean'];
  id: Scalars['Int'];
  owner: User;
  ownerId: Scalars['Int'];
  post: Post;
  updatedAt: Scalars['Date'];
};

export enum Status {
  Blocked = 'BLOCKED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Subscription = {
  __typename?: 'Subscription';
  friendshipMutated?: Maybe<FriendshipMutatedPayload>;
  lastSeenUpdated?: Maybe<Payload>;
  postMutated: PostMutatedPayload;
};


export type SubscriptionFriendshipMutatedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionLastSeenUpdatedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionPostMutatedArgs = {
  userId: Scalars['Int'];
};

export type UpdateCreatorInput = {
  friend_id: Scalars['Int'];
  id: Scalars['Int'];
};

export type UpdateMessageInput = {
  id: Scalars['Int'];
};

export type UpdatePostInput = {
  description?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['Int'];
};

export type UpdateReactionInput = {
  checked: Scalars['Boolean'];
  id: Scalars['Int'];
  type: ReactionEntities;
};

export type UpdateStatusInput = {
  id: Scalars['Int'];
  status?: InputMaybe<Status>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  lastSeen?: InputMaybe<Scalars['Date']>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  secondName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  friends?: Maybe<Array<Friendship>>;
  id: Scalars['Int'];
  isEmailConfirmed?: Maybe<Scalars['Boolean']>;
  lastSeen: Scalars['Date'];
  location?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', token?: string | null, user?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } };

export type RegisterMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } };

export type RestorePasswordMutationVariables = Exact<{
  restorePasswordInput: RestorePasswordInput;
}>;


export type RestorePasswordMutation = { __typename?: 'Mutation', restorePassword: { __typename?: 'UserResponse', token?: string | null, user?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } };

export type RegularCommentFragment = { __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } };

export type RegularFriendshipFragment = { __typename?: 'Friendship', id: number, friend_id: number, status: Status, updatedAt: any, attemptsCount: number, requestCreator: boolean, friend: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, requestCreatorInfo?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null };

export type RegularLikeFragment = { __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } };

export type RegularPostFragment = { __typename?: 'Post', id: number, description: string, image?: string | null, updatedAt: any, owner: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, likes?: Array<{ __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, shares?: Array<{ __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null };

export type RegularShareFragment = { __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } };

export type RegularUserFragment = { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', type?: NotificationType | null, nodes?: Array<{ __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } | { __typename?: 'Friendship', id: number, friend_id: number, status: Status, updatedAt: any, attemptsCount: number, requestCreator: boolean, friend: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, requestCreatorInfo?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } | { __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } | { __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } | null> | null } | null> };

export type CreateCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } };

export type CreateLikeMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike: { __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, description: string, image?: string | null, updatedAt: any, owner: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, likes?: Array<{ __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, shares?: Array<{ __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null } };

export type CreateShareMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CreateShareMutation = { __typename?: 'Mutation', createShare: { __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } };

export type RemoveCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment?: boolean | null };

export type RemoveLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: boolean };

export type RemovePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: boolean };

export type RemoveShareMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveShareMutation = { __typename?: 'Mutation', removeShare: boolean };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number, description: string, image?: string | null, updatedAt: any, owner: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, likes?: Array<{ __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, shares?: Array<{ __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null } };

export type UpdateReactionMutationVariables = Exact<{
  updateReactionInput: UpdateReactionInput;
}>;


export type UpdateReactionMutation = { __typename?: 'Mutation', updateReaction: boolean };

export type PostsQueryVariables = Exact<{
  paginationPostsInput: PaginationPostsInput;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPostsResponse', totalCount: number, hasMore: boolean, items: Array<{ __typename?: 'Post', id: number, description: string, image?: string | null, updatedAt: any, owner: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, likes?: Array<{ __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, shares?: Array<{ __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null, comments?: Array<{ __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } }> | null }> } };

export type PostMutatedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type PostMutatedSubscription = { __typename?: 'Subscription', postMutated: { __typename?: 'PostMutatedPayload', mutation: PostMutationType, node: { __typename?: 'Comment', id: number, text: string, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } | { __typename?: 'Like', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } | { __typename?: 'Share', id: number, updatedAt: any, ownerId: number, checked: boolean, owner: { __typename?: 'User', firstName: string, secondName: string, avatar?: string | null, id: number }, post: { __typename?: 'Post', id: number, description: string } } } };

export type CreateFriendshipMutationVariables = Exact<{
  createFriendshipInput: CreateFriendshipInput;
}>;


export type CreateFriendshipMutation = { __typename?: 'Mutation', createFriendship: { __typename?: 'Friendship', id: number, friend: { __typename?: 'User', id: number } } };

export type RemoveFriendshipMutationVariables = Exact<{
  removeFriendshipId: Scalars['Int'];
}>;


export type RemoveFriendshipMutation = { __typename?: 'Mutation', removeFriendship: { __typename?: 'Friendship', id: number } };

export type UpdateCreatorMutationVariables = Exact<{
  friendshipId: Scalars['Int'];
}>;


export type UpdateCreatorMutation = { __typename?: 'Mutation', updateCreator: { __typename?: 'Friendship', id: number, friend: { __typename?: 'User', id: number } } };

export type UpdateStatusMutationVariables = Exact<{
  updateStatusInput: UpdateStatusInput;
}>;


export type UpdateStatusMutation = { __typename?: 'Mutation', updateStatus: boolean };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } };

export type FriendsRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsRequestsQuery = { __typename?: 'Query', friendsRequests: Array<{ __typename?: 'Friendship', id: number, friend_id: number, status: Status, updatedAt: any, attemptsCount: number, requestCreator: boolean, friend: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, requestCreatorInfo?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } | null> };

export type FriendshipsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FriendshipsQuery = { __typename?: 'Query', friendships?: Array<{ __typename?: 'Friendship', id: number, friend_id: number, status: Status, updatedAt: any, attemptsCount: number, requestCreator: boolean, friend: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, requestCreatorInfo?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } | null> | null };

export type UserQueryVariables = Exact<{
  getUserInput?: InputMaybe<GetUserInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } };

export type FriendshipMutatedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FriendshipMutatedSubscription = { __typename?: 'Subscription', friendshipMutated?: { __typename?: 'FriendshipMutatedPayload', mutation: FriendshipMutationType, node: { __typename?: 'Friendship', id: number, friend_id: number, status: Status, updatedAt: any, attemptsCount: number, requestCreator: boolean, friend: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string }, requestCreatorInfo?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } } | null };

export type LastSeenUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type LastSeenUpdatedSubscription = { __typename?: 'Subscription', lastSeenUpdated?: { __typename?: 'Payload', user?: { __typename?: 'User', id: number, firstName: string, secondName: string, username: string, bio?: string | null, location?: string | null, email: string, phone?: string | null, avatar?: string | null, isEmailConfirmed?: boolean | null, lastSeen: any, password: string } | null } | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstName
  secondName
  username
  bio
  location
  email
  bio
  phone
  avatar
  isEmailConfirmed
  lastSeen
  password
}
    `;
export const RegularFriendshipFragmentDoc = gql`
    fragment RegularFriendship on Friendship {
  id
  friend {
    ...RegularUser
  }
  friend_id
  status
  updatedAt
  attemptsCount
  requestCreator
  requestCreatorInfo {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularLikeFragmentDoc = gql`
    fragment RegularLike on Like {
  id
  updatedAt
  ownerId
  checked
  owner {
    firstName
    secondName
    avatar
    id
  }
  post {
    id
    description
  }
}
    `;
export const RegularShareFragmentDoc = gql`
    fragment RegularShare on Share {
  id
  updatedAt
  ownerId
  checked
  owner {
    firstName
    secondName
    avatar
    id
  }
  post {
    id
    description
  }
}
    `;
export const RegularCommentFragmentDoc = gql`
    fragment RegularComment on Comment {
  id
  text
  updatedAt
  ownerId
  checked
  owner {
    firstName
    secondName
    avatar
    id
  }
  post {
    id
    description
  }
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  description
  image
  updatedAt
  owner {
    ...RegularUser
  }
  likes {
    ...RegularLike
  }
  shares {
    ...RegularShare
  }
  comments {
    ...RegularComment
  }
}
    ${RegularUserFragmentDoc}
${RegularLikeFragmentDoc}
${RegularShareFragmentDoc}
${RegularCommentFragmentDoc}`;
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
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    type
    nodes {
      ... on Like {
        ...RegularLike
      }
      ... on Share {
        ...RegularShare
      }
      ... on Friendship {
        ...RegularFriendship
      }
      ... on Comment {
        ...RegularComment
      }
    }
  }
}
    ${RegularLikeFragmentDoc}
${RegularShareFragmentDoc}
${RegularFriendshipFragmentDoc}
${RegularCommentFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentInput) {
    ...RegularComment
  }
}
    ${RegularCommentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateLikeDocument = gql`
    mutation CreateLike($postId: Int!) {
  createLike(postId: $postId) {
    ...RegularLike
  }
}
    ${RegularLikeFragmentDoc}`;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
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
export const CreateShareDocument = gql`
    mutation CreateShare($postId: Int!) {
  createShare(postId: $postId) {
    ...RegularShare
  }
}
    ${RegularShareFragmentDoc}`;
export type CreateShareMutationFn = Apollo.MutationFunction<CreateShareMutation, CreateShareMutationVariables>;

/**
 * __useCreateShareMutation__
 *
 * To run a mutation, you first call `useCreateShareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShareMutation, { data, loading, error }] = useCreateShareMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateShareMutation(baseOptions?: Apollo.MutationHookOptions<CreateShareMutation, CreateShareMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShareMutation, CreateShareMutationVariables>(CreateShareDocument, options);
      }
export type CreateShareMutationHookResult = ReturnType<typeof useCreateShareMutation>;
export type CreateShareMutationResult = Apollo.MutationResult<CreateShareMutation>;
export type CreateShareMutationOptions = Apollo.BaseMutationOptions<CreateShareMutation, CreateShareMutationVariables>;
export const RemoveCommentDocument = gql`
    mutation RemoveComment($id: Int!) {
  removeComment(id: $id)
}
    `;
export type RemoveCommentMutationFn = Apollo.MutationFunction<RemoveCommentMutation, RemoveCommentMutationVariables>;

/**
 * __useRemoveCommentMutation__
 *
 * To run a mutation, you first call `useRemoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentMutation, { data, loading, error }] = useRemoveCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCommentMutation, RemoveCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCommentMutation, RemoveCommentMutationVariables>(RemoveCommentDocument, options);
      }
export type RemoveCommentMutationHookResult = ReturnType<typeof useRemoveCommentMutation>;
export type RemoveCommentMutationResult = Apollo.MutationResult<RemoveCommentMutation>;
export type RemoveCommentMutationOptions = Apollo.BaseMutationOptions<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const RemoveLikeDocument = gql`
    mutation RemoveLike($id: Int!) {
  removeLike(id: $id)
}
    `;
export type RemoveLikeMutationFn = Apollo.MutationFunction<RemoveLikeMutation, RemoveLikeMutationVariables>;

/**
 * __useRemoveLikeMutation__
 *
 * To run a mutation, you first call `useRemoveLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeMutation, { data, loading, error }] = useRemoveLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeMutation, RemoveLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(RemoveLikeDocument, options);
      }
export type RemoveLikeMutationHookResult = ReturnType<typeof useRemoveLikeMutation>;
export type RemoveLikeMutationResult = Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationOptions = Apollo.BaseMutationOptions<RemoveLikeMutation, RemoveLikeMutationVariables>;
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
export const RemoveShareDocument = gql`
    mutation RemoveShare($id: Int!) {
  removeShare(id: $id)
}
    `;
export type RemoveShareMutationFn = Apollo.MutationFunction<RemoveShareMutation, RemoveShareMutationVariables>;

/**
 * __useRemoveShareMutation__
 *
 * To run a mutation, you first call `useRemoveShareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveShareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeShareMutation, { data, loading, error }] = useRemoveShareMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveShareMutation(baseOptions?: Apollo.MutationHookOptions<RemoveShareMutation, RemoveShareMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveShareMutation, RemoveShareMutationVariables>(RemoveShareDocument, options);
      }
export type RemoveShareMutationHookResult = ReturnType<typeof useRemoveShareMutation>;
export type RemoveShareMutationResult = Apollo.MutationResult<RemoveShareMutation>;
export type RemoveShareMutationOptions = Apollo.BaseMutationOptions<RemoveShareMutation, RemoveShareMutationVariables>;
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
export const UpdateReactionDocument = gql`
    mutation UpdateReaction($updateReactionInput: UpdateReactionInput!) {
  updateReaction(updateReactionInput: $updateReactionInput)
}
    `;
export type UpdateReactionMutationFn = Apollo.MutationFunction<UpdateReactionMutation, UpdateReactionMutationVariables>;

/**
 * __useUpdateReactionMutation__
 *
 * To run a mutation, you first call `useUpdateReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReactionMutation, { data, loading, error }] = useUpdateReactionMutation({
 *   variables: {
 *      updateReactionInput: // value for 'updateReactionInput'
 *   },
 * });
 */
export function useUpdateReactionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReactionMutation, UpdateReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReactionMutation, UpdateReactionMutationVariables>(UpdateReactionDocument, options);
      }
export type UpdateReactionMutationHookResult = ReturnType<typeof useUpdateReactionMutation>;
export type UpdateReactionMutationResult = Apollo.MutationResult<UpdateReactionMutation>;
export type UpdateReactionMutationOptions = Apollo.BaseMutationOptions<UpdateReactionMutation, UpdateReactionMutationVariables>;
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
export const PostMutatedDocument = gql`
    subscription PostMutated($userId: Int!) {
  postMutated(userId: $userId) {
    mutation
    node {
      ... on Like {
        ...RegularLike
      }
      ... on Share {
        ...RegularShare
      }
      ... on Comment {
        ...RegularComment
      }
    }
  }
}
    ${RegularLikeFragmentDoc}
${RegularShareFragmentDoc}
${RegularCommentFragmentDoc}`;

/**
 * __usePostMutatedSubscription__
 *
 * To run a query within a React component, call `usePostMutatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostMutatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostMutatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePostMutatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<PostMutatedSubscription, PostMutatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PostMutatedSubscription, PostMutatedSubscriptionVariables>(PostMutatedDocument, options);
      }
export type PostMutatedSubscriptionHookResult = ReturnType<typeof usePostMutatedSubscription>;
export type PostMutatedSubscriptionResult = Apollo.SubscriptionResult<PostMutatedSubscription>;
export const CreateFriendshipDocument = gql`
    mutation CreateFriendship($createFriendshipInput: CreateFriendshipInput!) {
  createFriendship(createFriendshipInput: $createFriendshipInput) {
    id
    friend {
      id
    }
  }
}
    `;
export type CreateFriendshipMutationFn = Apollo.MutationFunction<CreateFriendshipMutation, CreateFriendshipMutationVariables>;

/**
 * __useCreateFriendshipMutation__
 *
 * To run a mutation, you first call `useCreateFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendshipMutation, { data, loading, error }] = useCreateFriendshipMutation({
 *   variables: {
 *      createFriendshipInput: // value for 'createFriendshipInput'
 *   },
 * });
 */
export function useCreateFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<CreateFriendshipMutation, CreateFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFriendshipMutation, CreateFriendshipMutationVariables>(CreateFriendshipDocument, options);
      }
export type CreateFriendshipMutationHookResult = ReturnType<typeof useCreateFriendshipMutation>;
export type CreateFriendshipMutationResult = Apollo.MutationResult<CreateFriendshipMutation>;
export type CreateFriendshipMutationOptions = Apollo.BaseMutationOptions<CreateFriendshipMutation, CreateFriendshipMutationVariables>;
export const RemoveFriendshipDocument = gql`
    mutation RemoveFriendship($removeFriendshipId: Int!) {
  removeFriendship(id: $removeFriendshipId) {
    id
  }
}
    `;
export type RemoveFriendshipMutationFn = Apollo.MutationFunction<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>;

/**
 * __useRemoveFriendshipMutation__
 *
 * To run a mutation, you first call `useRemoveFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendshipMutation, { data, loading, error }] = useRemoveFriendshipMutation({
 *   variables: {
 *      removeFriendshipId: // value for 'removeFriendshipId'
 *   },
 * });
 */
export function useRemoveFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>(RemoveFriendshipDocument, options);
      }
export type RemoveFriendshipMutationHookResult = ReturnType<typeof useRemoveFriendshipMutation>;
export type RemoveFriendshipMutationResult = Apollo.MutationResult<RemoveFriendshipMutation>;
export type RemoveFriendshipMutationOptions = Apollo.BaseMutationOptions<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>;
export const UpdateCreatorDocument = gql`
    mutation updateCreator($friendshipId: Int!) {
  updateCreator(id: $friendshipId) {
    id
    friend {
      id
    }
  }
}
    `;
export type UpdateCreatorMutationFn = Apollo.MutationFunction<UpdateCreatorMutation, UpdateCreatorMutationVariables>;

/**
 * __useUpdateCreatorMutation__
 *
 * To run a mutation, you first call `useUpdateCreatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreatorMutation, { data, loading, error }] = useUpdateCreatorMutation({
 *   variables: {
 *      friendshipId: // value for 'friendshipId'
 *   },
 * });
 */
export function useUpdateCreatorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCreatorMutation, UpdateCreatorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCreatorMutation, UpdateCreatorMutationVariables>(UpdateCreatorDocument, options);
      }
export type UpdateCreatorMutationHookResult = ReturnType<typeof useUpdateCreatorMutation>;
export type UpdateCreatorMutationResult = Apollo.MutationResult<UpdateCreatorMutation>;
export type UpdateCreatorMutationOptions = Apollo.BaseMutationOptions<UpdateCreatorMutation, UpdateCreatorMutationVariables>;
export const UpdateStatusDocument = gql`
    mutation UpdateStatus($updateStatusInput: UpdateStatusInput!) {
  updateStatus(updateStatusInput: $updateStatusInput)
}
    `;
export type UpdateStatusMutationFn = Apollo.MutationFunction<UpdateStatusMutation, UpdateStatusMutationVariables>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      updateStatusInput: // value for 'updateStatusInput'
 *   },
 * });
 */
export function useUpdateStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStatusMutation, UpdateStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStatusMutation, UpdateStatusMutationVariables>(UpdateStatusDocument, options);
      }
export type UpdateStatusMutationHookResult = ReturnType<typeof useUpdateStatusMutation>;
export type UpdateStatusMutationResult = Apollo.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = Apollo.BaseMutationOptions<UpdateStatusMutation, UpdateStatusMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const FriendsRequestsDocument = gql`
    query FriendsRequests {
  friendsRequests {
    ...RegularFriendship
  }
}
    ${RegularFriendshipFragmentDoc}`;

/**
 * __useFriendsRequestsQuery__
 *
 * To run a query within a React component, call `useFriendsRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsRequestsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsRequestsQuery, FriendsRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsRequestsQuery, FriendsRequestsQueryVariables>(FriendsRequestsDocument, options);
      }
export function useFriendsRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsRequestsQuery, FriendsRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsRequestsQuery, FriendsRequestsQueryVariables>(FriendsRequestsDocument, options);
        }
export type FriendsRequestsQueryHookResult = ReturnType<typeof useFriendsRequestsQuery>;
export type FriendsRequestsLazyQueryHookResult = ReturnType<typeof useFriendsRequestsLazyQuery>;
export type FriendsRequestsQueryResult = Apollo.QueryResult<FriendsRequestsQuery, FriendsRequestsQueryVariables>;
export const FriendshipsDocument = gql`
    query Friendships($userId: Int!) {
  friendships(userId: $userId) {
    ...RegularFriendship
  }
}
    ${RegularFriendshipFragmentDoc}`;

/**
 * __useFriendshipsQuery__
 *
 * To run a query within a React component, call `useFriendshipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendshipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendshipsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFriendshipsQuery(baseOptions: Apollo.QueryHookOptions<FriendshipsQuery, FriendshipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendshipsQuery, FriendshipsQueryVariables>(FriendshipsDocument, options);
      }
export function useFriendshipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendshipsQuery, FriendshipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendshipsQuery, FriendshipsQueryVariables>(FriendshipsDocument, options);
        }
export type FriendshipsQueryHookResult = ReturnType<typeof useFriendshipsQuery>;
export type FriendshipsLazyQueryHookResult = ReturnType<typeof useFriendshipsLazyQuery>;
export type FriendshipsQueryResult = Apollo.QueryResult<FriendshipsQuery, FriendshipsQueryVariables>;
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
export const FriendshipMutatedDocument = gql`
    subscription FriendshipMutated($userId: Int!) {
  friendshipMutated(userId: $userId) {
    mutation
    node {
      ...RegularFriendship
    }
  }
}
    ${RegularFriendshipFragmentDoc}`;

/**
 * __useFriendshipMutatedSubscription__
 *
 * To run a query within a React component, call `useFriendshipMutatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFriendshipMutatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendshipMutatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFriendshipMutatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FriendshipMutatedSubscription, FriendshipMutatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FriendshipMutatedSubscription, FriendshipMutatedSubscriptionVariables>(FriendshipMutatedDocument, options);
      }
export type FriendshipMutatedSubscriptionHookResult = ReturnType<typeof useFriendshipMutatedSubscription>;
export type FriendshipMutatedSubscriptionResult = Apollo.SubscriptionResult<FriendshipMutatedSubscription>;
export const LastSeenUpdatedDocument = gql`
    subscription LastSeenUpdated($userId: Int!) {
  lastSeenUpdated(userId: $userId) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useLastSeenUpdatedSubscription__
 *
 * To run a query within a React component, call `useLastSeenUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLastSeenUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastSeenUpdatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLastSeenUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<LastSeenUpdatedSubscription, LastSeenUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LastSeenUpdatedSubscription, LastSeenUpdatedSubscriptionVariables>(LastSeenUpdatedDocument, options);
      }
export type LastSeenUpdatedSubscriptionHookResult = ReturnType<typeof useLastSeenUpdatedSubscription>;
export type LastSeenUpdatedSubscriptionResult = Apollo.SubscriptionResult<LastSeenUpdatedSubscription>;
export type CommentKeySpecifier = ('checked' | 'id' | 'owner' | 'ownerId' | 'post' | 'text' | 'updatedAt' | CommentKeySpecifier)[];
export type CommentFieldPolicy = {
	checked?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FriendshipKeySpecifier = ('attemptsCount' | 'friend' | 'friend_id' | 'id' | 'requestCreator' | 'requestCreatorInfo' | 'status' | 'updatedAt' | FriendshipKeySpecifier)[];
export type FriendshipFieldPolicy = {
	attemptsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	friend?: FieldPolicy<any> | FieldReadFunction<any>,
	friend_id?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	requestCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	requestCreatorInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FriendshipMutatedPayloadKeySpecifier = ('mutation' | 'node' | FriendshipMutatedPayloadKeySpecifier)[];
export type FriendshipMutatedPayloadFieldPolicy = {
	mutation?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LikeKeySpecifier = ('checked' | 'id' | 'owner' | 'ownerId' | 'post' | 'updatedAt' | LikeKeySpecifier)[];
export type LikeFieldPolicy = {
	checked?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageKeySpecifier = ('id' | 'owner' | 'ownerId' | 'text' | 'updatedAt' | MessageKeySpecifier)[];
export type MessageFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('confirm' | 'createComment' | 'createFriendship' | 'createLike' | 'createMessage' | 'createPost' | 'createRoom' | 'createShare' | 'forgotPassword' | 'login' | 'register' | 'removeComment' | 'removeFriendship' | 'removeLike' | 'removeMessage' | 'removePost' | 'removeRoom' | 'removeShare' | 'removeUser' | 'restorePassword' | 'updateCreator' | 'updateMessage' | 'updatePost' | 'updateReaction' | 'updateStatus' | 'updateUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	confirm?: FieldPolicy<any> | FieldReadFunction<any>,
	createComment?: FieldPolicy<any> | FieldReadFunction<any>,
	createFriendship?: FieldPolicy<any> | FieldReadFunction<any>,
	createLike?: FieldPolicy<any> | FieldReadFunction<any>,
	createMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	createRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	createShare?: FieldPolicy<any> | FieldReadFunction<any>,
	forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	removeComment?: FieldPolicy<any> | FieldReadFunction<any>,
	removeFriendship?: FieldPolicy<any> | FieldReadFunction<any>,
	removeLike?: FieldPolicy<any> | FieldReadFunction<any>,
	removeMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	removePost?: FieldPolicy<any> | FieldReadFunction<any>,
	removeRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	removeShare?: FieldPolicy<any> | FieldReadFunction<any>,
	removeUser?: FieldPolicy<any> | FieldReadFunction<any>,
	restorePassword?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	updateMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePost?: FieldPolicy<any> | FieldReadFunction<any>,
	updateReaction?: FieldPolicy<any> | FieldReadFunction<any>,
	updateStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationKeySpecifier = ('nodes' | 'type' | NotificationKeySpecifier)[];
export type NotificationFieldPolicy = {
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedPostsResponseKeySpecifier = ('hasMore' | 'items' | 'totalCount' | PaginatedPostsResponseKeySpecifier)[];
export type PaginatedPostsResponseFieldPolicy = {
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PayloadKeySpecifier = ('user' | PayloadKeySpecifier)[];
export type PayloadFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('comments' | 'description' | 'id' | 'image' | 'likes' | 'owner' | 'shares' | 'updatedAt' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	likes?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	shares?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostMutatedPayloadKeySpecifier = ('mutation' | 'node' | PostMutatedPayloadKeySpecifier)[];
export type PostMutatedPayloadFieldPolicy = {
	mutation?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('friendsRequests' | 'friendships' | 'me' | 'message' | 'messages' | 'notifications' | 'post' | 'posts' | 'room' | 'rooms' | 'user' | 'users' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	friendsRequests?: FieldPolicy<any> | FieldReadFunction<any>,
	friendships?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	notifications?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>,
	rooms?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomKeySpecifier = ('id' | 'messages' | 'participants' | 'updatedAt' | RoomKeySpecifier)[];
export type RoomFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ShareKeySpecifier = ('checked' | 'id' | 'owner' | 'ownerId' | 'post' | 'updatedAt' | ShareKeySpecifier)[];
export type ShareFieldPolicy = {
	checked?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('friendshipMutated' | 'lastSeenUpdated' | 'postMutated' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	friendshipMutated?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSeenUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	postMutated?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('avatar' | 'bio' | 'email' | 'firstName' | 'friends' | 'id' | 'isEmailConfirmed' | 'lastSeen' | 'location' | 'password' | 'phone' | 'posts' | 'secondName' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	friends?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isEmailConfirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSeen?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
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
	Comment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier),
		fields?: CommentFieldPolicy,
	},
	Friendship?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FriendshipKeySpecifier | (() => undefined | FriendshipKeySpecifier),
		fields?: FriendshipFieldPolicy,
	},
	FriendshipMutatedPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FriendshipMutatedPayloadKeySpecifier | (() => undefined | FriendshipMutatedPayloadKeySpecifier),
		fields?: FriendshipMutatedPayloadFieldPolicy,
	},
	Like?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LikeKeySpecifier | (() => undefined | LikeKeySpecifier),
		fields?: LikeFieldPolicy,
	},
	Message?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageKeySpecifier | (() => undefined | MessageKeySpecifier),
		fields?: MessageFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Notification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationKeySpecifier | (() => undefined | NotificationKeySpecifier),
		fields?: NotificationFieldPolicy,
	},
	PaginatedPostsResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedPostsResponseKeySpecifier | (() => undefined | PaginatedPostsResponseKeySpecifier),
		fields?: PaginatedPostsResponseFieldPolicy,
	},
	Payload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PayloadKeySpecifier | (() => undefined | PayloadKeySpecifier),
		fields?: PayloadFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	PostMutatedPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostMutatedPayloadKeySpecifier | (() => undefined | PostMutatedPayloadKeySpecifier),
		fields?: PostMutatedPayloadFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Room?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomKeySpecifier | (() => undefined | RoomKeySpecifier),
		fields?: RoomFieldPolicy,
	},
	Share?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ShareKeySpecifier | (() => undefined | ShareKeySpecifier),
		fields?: ShareFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
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