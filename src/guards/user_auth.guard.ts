import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationIDTokenService } from 'src/modules/user/domain/services/login.service';
import { CustomRequestObject } from 'src/types/request';

@Injectable()
export class TokenGuard {
  constructor(
    private readonly authenticationIDTokenService: AuthenticationIDTokenService,
  ) {
    this.authenticationIDTokenService = authenticationIDTokenService;
  }
  canActivate(context: ExecutionContext) {
    const request: CustomRequestObject = context.switchToHttp().getRequest();
    const user = this.authenticationIDTokenService.getUserIdFromIdToken(
      request.userId,
    );
    if (user == null) {
      throw new UnauthorizedException('User not authenticated. Please log in.');
    } else if (typeof user == 'string') {
      request.userId = user;
      return request;
    }
  }
}
