
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

export enum FriendshipMutationType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}

export enum NotificationType {
    Like = "Like",
    Share = "Share",
    Comment = "Comment",
    Friendship = "Friendship"
}

export enum GetPostsActionType {
    friends = "friends",
    all = "all",
    owner = "owner"
}

export enum ReactionEntities {
    Like = "Like",
    Share = "Share",
    Comment = "Comment"
}

export enum PostMutationType {
    LIKE_CREATED = "LIKE_CREATED",
    LIKE_DELETED = "LIKE_DELETED",
    SHARE_CREATED = "SHARE_CREATED",
    SHARE_DELETED = "SHARE_DELETED",
    COMMENT_CREATED = "COMMENT_CREATED",
    COMMENT_DELETED = "COMMENT_DELETED"
}

export class LoginInput {
    email: string;
    password: string;
}

export class RestorePasswordInput {
    email: string;
    password: string;
}

export class CreateRoomInput {
    participantId: number;
}

export class CreateMessageInput {
    text: string;
    roomId: number;
}

export class UpdateMessageInput {
    id: number;
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

export class UpdateReactionInput {
    id: number;
    type: ReactionEntities;
    checked: boolean;
}

export class UpdatePostInput {
    id: number;
    description?: Nullable<string>;
    file?: Nullable<Upload>;
}

export class PaginationPostsInput {
    action?: Nullable<GetPostsActionType>;
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
    lastSeen?: Nullable<Date>;
}

export class GetUserInput {
    id?: Nullable<number>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export class UserResponse {
    __typename?: 'UserResponse';
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract me(): User | Promise<User>;

    abstract rooms(): Nullable<Room>[] | Promise<Nullable<Room>[]>;

    abstract messages(): Nullable<Message>[] | Promise<Nullable<Message>[]>;

    abstract message(id: number): Nullable<Message> | Promise<Nullable<Message>>;

    abstract room(participantId: number): Nullable<Room> | Promise<Nullable<Room>>;

    abstract friendships(userId: number): Nullable<Nullable<Friendship>[]> | Promise<Nullable<Nullable<Friendship>[]>>;

    abstract friendsRequests(): Nullable<Friendship>[] | Promise<Nullable<Friendship>[]>;

    abstract notifications(): Nullable<Notification>[] | Promise<Nullable<Notification>[]>;

    abstract posts(paginationPostsInput?: Nullable<PaginationPostsInput>): PaginatedPostsResponse | Promise<PaginatedPostsResponse>;

    abstract post(id: number): Nullable<Post> | Promise<Nullable<Post>>;

    abstract user(getUserInput?: Nullable<GetUserInput>): User | Promise<User>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract register(createUserInput: CreateUserInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): UserResponse | Promise<UserResponse>;

    abstract forgotPassword(email: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract restorePassword(restorePasswordInput: RestorePasswordInput): UserResponse | Promise<UserResponse>;

    abstract confirm(token: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createMessage(createMessageInput: CreateMessageInput): Message | Promise<Message>;

    abstract createRoom(createRoomInput: CreateRoomInput): Room | Promise<Room>;

    abstract updateMessage(updateMessageInput: UpdateMessageInput): Message | Promise<Message>;

    abstract removeMessage(id: number): boolean | Promise<boolean>;

    abstract removeRoom(id: number): boolean | Promise<boolean>;

    abstract createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;

    abstract removeComment(id: number): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createFriendship(createFriendshipInput: CreateFriendshipInput): Friendship | Promise<Friendship>;

    abstract removeFriendship(id: number): Friendship | Promise<Friendship>;

    abstract updateStatus(updateStatusInput: UpdateStatusInput): boolean | Promise<boolean>;

    abstract updateCreator(id: number): Friendship | Promise<Friendship>;

    abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;

    abstract updateReaction(updateReactionInput: UpdateReactionInput): boolean | Promise<boolean>;

    abstract removePost(id: number): boolean | Promise<boolean>;

    abstract createLike(postId: number): Like | Promise<Like>;

    abstract createShare(postId: number): Share | Promise<Share>;

    abstract removeLike(id: number): boolean | Promise<boolean>;

    abstract removeShare(id: number): boolean | Promise<boolean>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class Room {
    __typename?: 'Room';
    id: number;
    participants: Nullable<User>[];
    messages: Nullable<Message>[];
    updatedAt: Date;
}

export class Message {
    __typename?: 'Message';
    id: number;
    owner: User;
    ownerId: number;
    updatedAt: Date;
    text: string;
}

export class Comment {
    __typename?: 'Comment';
    id: number;
    text: string;
    updatedAt: Date;
    owner: User;
    ownerId: number;
    post: Post;
    checked: boolean;
}

export class Friendship {
    __typename?: 'Friendship';
    id: number;
    friend_id: number;
    friend: User;
    status: Status;
    updatedAt: Date;
    attemptsCount: number;
    requestCreator: boolean;
    requestCreatorInfo?: Nullable<User>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract friendshipMutated(userId: number): Nullable<FriendshipMutatedPayload> | Promise<Nullable<FriendshipMutatedPayload>>;

    abstract postMutated(userId: number): PostMutatedPayload | Promise<PostMutatedPayload>;

    abstract lastSeenUpdated(userId: number): Nullable<Payload> | Promise<Nullable<Payload>>;
}

export class FriendshipMutatedPayload {
    __typename?: 'FriendshipMutatedPayload';
    mutation: FriendshipMutationType;
    node: Friendship;
}

export class Notification {
    __typename?: 'Notification';
    type?: Nullable<NotificationType>;
    nodes?: Nullable<Nullable<NotificationNode>[]>;
}

export class Like {
    __typename?: 'Like';
    id: number;
    updatedAt: Date;
    owner: User;
    ownerId: number;
    post: Post;
    checked: boolean;
}

export class Share {
    __typename?: 'Share';
    id: number;
    updatedAt: Date;
    owner: User;
    ownerId: number;
    post: Post;
    checked: boolean;
}

export class Post {
    __typename?: 'Post';
    id: number;
    description: string;
    image?: Nullable<string>;
    updatedAt: Date;
    owner: User;
    likes?: Nullable<Like[]>;
    shares?: Nullable<Share[]>;
    comments?: Nullable<Comment[]>;
}

export class PaginatedPostsResponse {
    __typename?: 'PaginatedPostsResponse';
    items: Post[];
    totalCount: number;
    hasMore: boolean;
}

export class PostMutatedPayload {
    __typename?: 'PostMutatedPayload';
    mutation: PostMutationType;
    node: PostMutatedNode;
}

export class User {
    __typename?: 'User';
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
    lastSeen: Date;
}

export class Payload {
    __typename?: 'Payload';
    user?: Nullable<User>;
}

export type Upload = any;
export type NotificationNode = Like | Share | Friendship | Comment;
export type PostMutatedNode = Like | Share | Comment;
type Nullable<T> = T | null;
