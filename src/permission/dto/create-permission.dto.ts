import { IsUUID, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
  // UUID of the associated Module
  @IsUUID()
  module_id: string;

  // UUID of the associated Role
  @IsUUID()
  role_id: string;

  // Permission flags
  @IsBoolean()
  can_read: boolean;

  @IsBoolean()
  can_add: boolean;

  @IsBoolean()
  can_edit: boolean;

  @IsBoolean()
  can_delete: boolean;
}
