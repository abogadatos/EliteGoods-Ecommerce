import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

function loginAuthentication(request) {
  const email = request.headers['email'];
  const password = request.headers['password'];

  if (!email || !password) {
    return false;
  } else {
    return true;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return loginAuthentication(request);
  }
}
