import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { PrismaModule } from './prisma/prisma.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FilesModule } from 'files/files.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req, connection }) => {
        return connection ? { req: connection.context } : { req };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    PrismaModule,
    UserModule,
    EmailModule,
    AuthModule,
    PostModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
