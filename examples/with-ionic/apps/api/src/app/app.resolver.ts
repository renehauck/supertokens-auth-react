import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';

@Resolver()
export class AppResolver {
    @Query(returns => String)
    @UseGuards(AuthGuard)
    async me() {
      return "ME";
    }
}
