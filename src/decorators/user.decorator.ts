import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface CustomRequest extends Request {
  user?: { id: string; name: string; email: string }; // Replace with the actual structure of 'user'
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return request.user;
  },
);
