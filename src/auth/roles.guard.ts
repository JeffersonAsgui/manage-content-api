import { Injectable, CanActivate, ExecutionContext, ForbiddenException, ContextType } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext) {

        const req = this.getRequest(context);

        const user: UserDTO = req && req.user;

        const userPermission = user?.type || [];

        const requiredPermission = this.reflector.get(ROLES_KEY, context.getHandler()) || [];

        if (requiredPermission.length === 0 ||
            requiredPermission.includes(userPermission)) {
            return true;
        }

        throw new ForbiddenException("Insufficient Permissions");

    }

    private getRequest(context: ExecutionContext) {
        if (context.getType<ContextType | 'graphql'>() === 'graphql') {
            return GqlExecutionContext.create(context).getContext().req;
        }
        return context.switchToHttp().getRequest();
    }

}