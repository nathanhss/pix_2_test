import { Roles } from './roles.enum';
import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
