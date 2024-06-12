import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
// import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(created_by_id: string, createRoleDto: CreateRoleDto) {
    const { permissions, ...roleData } = createRoleDto;

    // Create the role entity from the DTO
    const role = this.rolesRepository.create({
      ...roleData,
      created_by: created_by_id,
      updated_by: created_by_id,
    });

    // Fetch permissions based on provided IDs and validate them
    if (permissions && permissions.length > 0) {
      const permissionEntities =
        await this.permissionRepository.findByIds(permissions);

      // Validate if all requested permissions were found
      if (permissionEntities.length !== permissions.length) {
        throw new Error('Some permissions not found');
      }

      // Assign the fetched permission entities to the role
      role.permissions = permissionEntities;
    }

    // Save the role along with its permissions
    const savedRole = await this.rolesRepository.save(role);

    // Fetch the saved role including its permissions for the response
    const roleWithPermissions = await this.rolesRepository.findOne({
      where: { id: savedRole.id },
      relations: ['permissions'],
    });

    // Transform the role to RoleWithPermissionsDTO
    return {
      id: roleWithPermissions.id,
      role: roleWithPermissions.role,
      is_active: roleWithPermissions.is_active,
      is_deleted: roleWithPermissions.is_deleted,
      created_at: roleWithPermissions.created_at,
      updated_at: roleWithPermissions.updated_at,
      permissions: roleWithPermissions.permissions.map((permission) => ({
        id: permission.id,
      })),
    };
  }

  async findAll() {
    // Fetch roles with their related permissions
    const roles = await this.rolesRepository.find({
      relations: ['permissions'],
    });

    // Transform the role entities to RoleWithPermissionsDTO
    return roles.map((role) => ({
      id: role.id,
      role: role.role,
      is_active: role.is_active,
      is_deleted: role.is_deleted,
      created_at: role.created_at,
      updated_at: role.updated_at,
      permissions: role.permissions.map((permission) => ({
        id: permission.id,
      })),
    }));
  }

  findOne(id: string) {
    return this.rolesRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // await this.rolesRepository.update(id, updateRoleDto);
    // return this.rolesRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    return 'this';
  }
  async findOneWithPermissions(id: string) {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    // Transform Role entity to RoleWithPermissionsDTO
    return {
      id: role.id,
      role: role.role,
      is_active: role.is_active,
      is_deleted: role.is_deleted,
      created_at: role.created_at,
      updated_at: role.updated_at,
      permissions: role.permissions.map((permission) => ({
        id: permission.id,
        module: permission.module,
      })),
    };
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
