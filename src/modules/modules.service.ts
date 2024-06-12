import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Module as ModuleSchema } from './entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleSchema)
    private moduleRepository: Repository<ModuleSchema>,
  ) {}
  async create(createModuleDto: CreateModuleDto) {
    if (createModuleDto.main_module) {
      const existingModule = await this.moduleRepository.findOne({
        where: { id: createModuleDto.main_module },
      });
      if (!existingModule) {
        throw new HttpException(
          'Main module ID does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const newModule = this.moduleRepository.create({
      module: createModuleDto.module,
      is_main: createModuleDto.is_main,
      main_module: createModuleDto.main_module
        ? { id: createModuleDto.main_module } // Linking main_module by ID
        : null,
    });
    return this.moduleRepository.save(newModule);
  }

  findAll() {
    return this.moduleRepository.find();
  }

  findOne(id: string) {
    return this.moduleRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateModuleDto: UpdateModuleDto) {
    return '';
    // return this.moduleRepository.update(
    //   { id },
    //   {
    //     main_module: {
    //       main_module
    //     },
    //   },
    // );
  }

  async remove(id: string) {
    const existingModule = await this.moduleRepository.findOne({
      where: { id },
    });
    if (existingModule) {
      return this.moduleRepository.remove(existingModule);
    } else {
      throw new HttpException('No modules exisit', HttpStatus.NOT_FOUND);
    }
  }
}
