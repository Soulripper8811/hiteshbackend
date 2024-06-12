import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Module as ModuleSchema } from './entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleSchema])],

  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
