import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Module as ModuleSchema } from 'src/modules/entities/module.entity';
import { Role } from 'src/roles/entities/role.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Permission,ModuleSchema,Role])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
