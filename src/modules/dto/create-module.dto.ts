import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Module } from '../entities/module.entity';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  module: string;

  @IsBoolean()
  is_main: boolean;
  main_module: string;
}
