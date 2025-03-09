import { Module } from '@nestjs/common';
import { AuthenticationIDTokenService } from './infrastructure/service/login.service';
import { FirebaseService } from '../../infrastructure/firebase/firebase.service';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  controllers: [],
  providers: [AuthenticationIDTokenService, FirebaseService, UserRepository],
})
export class UserModule {}
