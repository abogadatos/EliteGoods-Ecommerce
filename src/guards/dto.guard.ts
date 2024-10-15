import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

function validateDTO(request) {
  const dtoFullName = request.body['fullName'];
  const dtoDni = request.body['dni'];
  const dtoEmail = request.body['email'];
  const dtoPassword = request.body['password'];
  const dtoPhone = request.body['phone'];
  const dtoCountry = request.body['country'];
  const dtoCity = request.body['city'];
  const dtotoken = request.body['token'];
  if (
    !dtoFullName ||
    !dtoDni ||
    !dtoEmail ||
    !dtoPassword ||
    !dtoPhone ||
    !dtoCountry ||
    !dtoCity ||
    !dtotoken
  ) {
    return false;
  }
  return true;
}

@Injectable()
export class DtoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return validateDTO(request);
  }
}
