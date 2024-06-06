import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "src/decorators/role.decorator";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [context.getClass(), context.getHandler()]);

        const token = request.headers.authorization.split(' ')[1];

        try {
            const userRole = this.jwtService.verify(token).role;

            if (!userRole || userRole !== requiredRole) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }
}
