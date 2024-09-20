import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'email tiene que ser un correo' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Rol del usuario',
    enum: ['admin', 'broker', 'cliente'],
  })
  @IsEnum(['admin', 'broker', 'cliente'], { message: 'Invalid role' })
  role: string;

  @ApiProperty({
    example: 'entity123',
    description: 'ID de la entidad a la que pertenece el usuario',
  })
  @IsNotEmpty()
  entityId: string;
}
