
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    CONFIRMED = "CONFIRMED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED"
}

export enum MutationType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}

export enum ActionType {
    friends = "friends",
    all = "all",
    owner = "owner"
}

export class LoginInput {
    email: string;
    password: string;
}

export class RestorePasswordInput {
    email: string;
    password: string;
}

export class CreateCommentInput {
    postId: number;
    text: string;
}

export class CreateFriendshipInput {
    friend_id: number;
}

export class UpdateStatusInput {
    id: number;
    status?: Nullable<Status>;
}

export class UpdateCreatorInput {
    id: number;
    friend_id: number;
}

export class CreatePostInput {
    description: string;
    file?: Nullable<Upload>;
}

export class UpdatePostInput {
    id: number;
    description?: Nullable<string>;
    file?: Nullable<Upload>;
}

export class PaginationPostsInput {
    action?: Nullable<ActionType>;
    ownerId: number;
    take?: Nullable<number>;
    activePage?: Nullable<number>;
}

export class CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    username: string;
}

export class UpdateUserInput {
    id: number;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    username?: Nullable<string>;
    bio?: Nullable<string>;
    location?: Nullable<string>;
    email?: Nullable<string>;
    avatar?: Nullable<Upload>;
    phone?: Nullable<string>;
    password?: Nullable<string>;
    lastSeen?: Nullable<string>;
}

export class GetUserInput {
    id?: Nullable<number>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export class UserResponse {
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;

    abstract friendships(userId: number): Nullable<Nullable<Friendship>[]> | Promise<Nullable<Nullable<Friendship>[]>>;

    abstract friendsRequests(): Nullable<Friendship>[] | Promise<Nullable<Friendship>[]>;

    abstract posts(paginationPostsInput?: Nullable<PaginationPostsInput>): PaginatedPostsResponse | Promise<PaginatedPostsResponse>;

    abstract post(id: number): Nullable<Post> | Promise<Nullable<Post>>;

    abstract user(getUserInput?: Nullable<GetUserInput>): User | Promise<User>;

    abstract onlineUsers(getUserInput?: Nullable<GetUserInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    abstract register(createUserInput: CreateUserInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): UserResponse | Promise<UserResponse>;

    abstract forgotPassword(email: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract restorePassword(restorePasswordInput: RestorePasswordInput): UserResponse | Promise<UserResponse>;

    abstract confirm(token: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;

    abstract removeComment(id: number): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createFriendship(createFriendshipInput: CreateFriendshipInput): Friendship | Promise<Friendship>;

    abstract removeFriendship(id: number): Friendship | Promise<Friendship>;

    abstract updateStatus(updateStatusInput: UpdateStatusInput): boolean | Promise<boolean>;

    abstract updateCreator(id: number): Friendship | Promise<Friendship>;

    abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;

    abstract removePost(id: number): boolean | Promise<boolean>;

    abstract createLike(postId: number): Like | Promise<Like>;

    abstract createShare(postId: number): Share | Promise<Share>;

    abstract removeLike(id: number): boolean | Promise<boolean>;

    abstract removeShare(id: number): boolean | Promise<boolean>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class Comment {
    id: number;
    text: string;
    createdAt: string;
    updatedAt?: Nullable<string>;
    owner: User;
    ownerId: number;
}

export class Friendship {
    id: number;
    friend_id: number;
    friend: User;
    status: Status;
    createdAt: string;
    updatedAt: string;
    attemptsCount: number;
    requestCreator: boolean;
}

export abstract class ISubscription {
    abstract friendshipMutated(userId: number): Nullable<FriendshipMutatedPayload> | Promise<Nullable<FriendshipMutatedPayload>>;

    abstract lastSeenUpdated(userId: number): Nullable<Payload> | Promise<Nullable<Payload>>;
}

export class FriendshipMutatedPayload {
    mutation: MutationType;
    node: Friendship;
}

export class Like {
    id: number;
    createdAt: string;
    updatedAt?: Nullable<string>;
    owner: User;
    ownerId: number;
}

export class Share {
    id: number;
    createdAt: string;
    updatedAt?: Nullable<string>;
    owner: User;
    ownerId: number;
}

export class Post {
    id: number;
    description: string;
    image?: Nullable<string>;
    createdAt: string;
    updatedAt?: Nullable<string>;
    owner: User;
    likes?: Nullable<Like[]>;
    shares?: Nullable<Share[]>;
    comments?: Nullable<Comment[]>;
}

export class PaginatedPostsResponse {
    items: Post[];
    totalCount: number;
    hasMore: boolean;
}

export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    bio?: Nullable<string>;
    avatar?: Nullable<string>;
    location?: Nullable<string>;
    phone?: Nullable<string>;
    username: string;
    isEmailConfirmed?: Nullable<boolean>;
    posts?: Nullable<Post[]>;
    friends?: Nullable<Friendship[]>;
    lastSeen: string;
}

export class Payload {
    user?: Nullable<User>;
}

export type Upload = any;
type Nullable<T> = T | null;
