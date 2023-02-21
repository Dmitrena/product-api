import { User } from './../../user/schemas/user.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type TypeData = keyof User;

export const CurrentUser = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
