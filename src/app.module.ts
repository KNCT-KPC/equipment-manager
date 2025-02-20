import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { EquipmentController } from './modules/equipment/equipment.controller';

@Module({
  imports: [UserModule, EquipmentModule],
  controllers: [AppController, UserController, EquipmentController],
  providers: [AppService],
})
export class AppModule {}
