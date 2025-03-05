import { Module } from '@nestjs/common';
import { AuthenticationIDTokenService } from './infrastructure/service/login.service';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Module({
  controllers: [],
  providers: [AuthenticationIDTokenService, FirebaseService],
})
export class UserModule {}
