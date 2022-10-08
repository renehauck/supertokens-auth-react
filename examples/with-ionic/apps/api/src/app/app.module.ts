import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import * as express from 'express';

interface IContext {
  next: express.NextFunction;
  req: express.Request;
  res: express.Response;
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      cors:"http://localhost:4200",
      context: (request: IContext) => {
        const context:IContext = {
          req: request.req,
          res: request.res,
          next: request.req.next,
        };
        return context;
      },
    }),
    AuthModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "http://localhost:3569",
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "MyApp",
        apiDomain: "http://localhost:3333/",
        websiteDomain: "http://localhost",
        apiBasePath: "/api",
        websiteBasePath: "/auth",
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService,AppResolver],
})
export class AppModule {}
