import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { ContentDetailModule } from './content-detail/content-detail.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContentViewsModule } from './content-views/content-views.module';
import { TesteresModule } from './testeres/testeres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ContentModule,
    ContentDetailModule,
    UserModule,
    AuthModule,
    ContentViewsModule,
    TesteresModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }