import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { Access_token_strategy } from './strategies/access_token.strategy';
import { RtStrategy } from './strategies/refresh_token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule],
  controllers: [AdminController],
  providers: [AdminService, Access_token_strategy, RtStrategy],
})
export class AdminModule { }
