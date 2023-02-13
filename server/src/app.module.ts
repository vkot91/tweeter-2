import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GqlContextType, GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

import { PubSubModule } from 'pub-sub/pub-sub.module';
import { CommentModule } from 'comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { FilesModule } from 'files/files.module';
import { FriendsModule } from './friends/friends.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ChatModule } from './chat/chat.module';
import { EmailModule } from './email/email.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dateScalar } from 'date/date.resolver';
import { NotificationModule } from './notification/notification.module';

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
        path: path.join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
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
      resolvers: {
        Date: dateScalar,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    PubSubModule,
    PrismaModule,
    EmailModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    FilesModule,
    FriendsModule,
    NotificationModule,
    ChatModule,
  ],
})
export class AppModule {}
