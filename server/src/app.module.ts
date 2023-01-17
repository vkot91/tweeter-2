import { PrismaModule } from './prisma/prisma.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GqlContextType, GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from 'comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FilesModule } from 'files/files.module';
import { ConfigModule } from '@nestjs/config';
import { FriendsModule } from './friends/friends.module';

import { PubSubModule } from './pub-sub/pub-sub.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
export interface GqlContext {
  req: Request;
  res: Response;
  payload?: GqlContextType;
  connection: any;
}
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
        };
        console.error(graphQLFormattedError);
        return graphQLFormattedError;
      },
      subscriptions: {
        'graphql-ws': {
          onConnect: ({ connectionParams }) => {
            return {
              req: {
                headers: {
                  Authorization: connectionParams.token,
                },
              },
            };
          },
        },
        'subscriptions-transport-ws': true,
      },
      context: (context) => {
        if (context?.extra?.request) {
          return {
            req: {
              ...context?.extra?.request,
              headers: {
                ...context?.extra?.request?.headers,
                ...context?.connectionParams,
              },
            },
          };
        }

        return { req: context?.req };
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    PrismaModule,
    EmailModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    FilesModule,
    FriendsModule,
    PubSubModule,
  ],
  controllers: [],
})
export class AppModule {}
