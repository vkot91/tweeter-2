
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
    email: string;
    password: string;
}

export class RestorePasswordInput {
    email: string;
    password: string;
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
    password?: Nullable<string>;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    username?: Nullable<string>;
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

    abstract posts(paginationPostsInput?: Nullable<PaginationPostsInput>): PaginatedPostsResponse | Promise<PaginatedPostsResponse>;

    abstract post(id: number): Nullable<Post> | Promise<Nullable<Post>>;

    abstract user(getUserInput?: Nullable<GetUserInput>): User | Promise<User>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    abstract register(createUserInput: CreateUserInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): UserResponse | Promise<UserResponse>;

    abstract forgotPassword(email: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract restorePassword(restorePasswordInput: RestorePasswordInput): UserResponse | Promise<UserResponse>;

    abstract confirm(token: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;

    abstract removePost(id: number): boolean | Promise<boolean>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class Post {
    id: number;
    description: string;
    image?: Nullable<string>;
    createdAt: string;
    updatedAt?: Nullable<string>;
    owner: User;
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
    username: string;
    isEmailConfirmed?: Nullable<boolean>;
    posts?: Nullable<Post[]>;
}

export type Upload = any;
type Nullable<T> = T | null;
