import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(cointext: ExecutionContext): boolean {
    const req = cointext.switchToHttp().getRequest();

    if (!req.user?.isAdmin) {
      throw new ForbiddenException("Access denied: Admins only");
    }
    return true;
  }
}