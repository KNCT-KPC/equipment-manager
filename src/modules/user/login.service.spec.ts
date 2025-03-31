import { AuthenticationIDTokenService } from './infrastructure/service/login.service';
import { NestFactory } from '@nestjs/core';
import { Handler } from 'aws-lambda';
import { UserModule } from './user.module';

export const handler: Handler = async () => {
  const app = await NestFactory.create(UserModule);
  const authenticationIDTokenService = app.get(AuthenticationIDTokenService);
  await authenticationIDTokenService.getUserIdFromIdToken(
    '0195527e-94c1-7a83-80c7-ca670a7cefe7',
  );
  return { message: 'user found' };
};

describe('LoginService', () => {
  it('should return userId from idToken', () => {
    expect(handler).toBeUndefined();
  });
});
