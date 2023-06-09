import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '../../modules/auth/models/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const gqlContext = GqlExecutionContext.create(context);
            const { rawHeaders } = gqlContext.getContext().req;
            const token = this.extractTokenFromHeader(rawHeaders);
            if (!token) {
                throw new UnauthorizedException();
            }
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
            if (payload.isRefresh) {
                throw new UnauthorizedException();
            }
            gqlContext.getContext().user = payload;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private extractTokenFromHeader(headers: string[]): string | undefined {
        const token = headers.find((header) => header.includes('Bearer'));
        return token ? token.replace('Bearer ', '') : undefined;
    }
}
