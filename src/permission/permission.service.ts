import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Module } from 'src/modules/entities/module.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const { module_id, role_id, can_read, can_add, can_edit, can_delete } =
      createPermissionDto;

    // Verify the module exists
    const module = await this.moduleRepository.findOne({
      where: {
        id: module_id,
      },
    });
    if (!module) {
      throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
    }

    // Verify the role exists
    const role = await this.roleRepository.findOne({
      where: {
        id: role_id,
      },
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    // Create a new Permission entity
    const newPermission = this.permissionRepository.create({
      module,
      role,
      can_read,
      can_add,
      can_edit,
      can_delete,
    });

    // Save the Permission entity to the database
    return this.permissionRepository.save(newPermission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: string) {
    return this.permissionRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  async remove(id: string) {
    const existingPermissionValue = await this.permissionRepository.findOne({
      where: {
        id,
      },
    });

    return this.permissionRepository.remove(existingPermissionValue);
  }
}
