import { IsBoolean, IsNotEmpty, IsString, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsBoolean()
  is_active?: boolean;

  @IsBoolean()
  is_deleted?: boolean;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsString()
  updated_by?: string;

  // Updated to accept an array of permission IDs
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true }) // Validates that each item in the array is a UUID
  permissions: string[];
}
