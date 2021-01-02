import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../roles/roles.entity';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  roles: Role[];
}
