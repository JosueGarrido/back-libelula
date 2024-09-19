import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityDto {
  @ApiProperty({ example: 'Nombre del Broker', description: 'Nombre de la entidad' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Dirección de la Entidad', description: 'Dirección de la entidad' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'contact@broker.com', description: 'Correo de contacto de la entidad' })
  @IsEmail()
  contactEmail: string;
}
