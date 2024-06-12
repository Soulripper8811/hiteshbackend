import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import * as dotenv from 'dotenv';
import { Role } from 'src/roles/entities/role.entity';

import { Module as ModuleSchema } from 'src/modules/entities/module.entity';
import { Permission } from 'src/permission/entities/permission.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SQL_HOST || 'localhost',
      // port: +process.env.SQL_PORT || 5432,
      username: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD as string,
      database: process.env.SQL_DATABASE,
      entities: [Admin, Role, ModuleSchema, Permission],
      synchronize: true,
      ssl: true,
    }),
  ],
})
export class DatabaseModule {}
