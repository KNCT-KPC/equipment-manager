import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type CustomRequestObject } from '../types/request';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: CustomRequestObject = ctx.switchToHttp().getRequest();

    //NOTE: request.userId はミドルウェア等でセットされていることを想定
    return request.userId;
  },
);
