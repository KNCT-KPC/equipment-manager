import { Module } from '@nestjs/common';
import { AuthenticationIDToken } from './infrastructure/service/login.service';
import { Firebase } from 'src/infrastructure/firebase/firebase.service';

@Module({
  controllers: [],
  providers: [AuthenticationIDToken, Firebase],
})
export class UserModule {}
