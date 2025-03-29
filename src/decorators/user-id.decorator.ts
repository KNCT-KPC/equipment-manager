import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  //NOTE: request.user はミドルウェア等でセットされていることを想定
  const user = request.user;
  return user.id;
});