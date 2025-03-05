import { Module } from '@nestjs/common';
import { AuthenticationIDToken } from './infrastructure/service/login.service';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Module({
  controllers: [],
  providers: [AuthenticationIDToken, FirebaseService],
})
export class UserModule {}
