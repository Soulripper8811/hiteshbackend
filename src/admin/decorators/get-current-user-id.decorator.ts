import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../admin/types/jwt_payload';

export const GetCurrentAdminId = createParamDecorator(
    (_: undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload;
        return user.sub;
    },
);