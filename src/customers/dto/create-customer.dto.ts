import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe', description: 'Nombre del cliente' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Correo electrónico del cliente',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+123456789',
    description: 'Número de teléfono del cliente',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'entity123',
    description: 'ID de la entidad a la que pertenece el cliente',
  })
  @IsNotEmpty()
  entityId: string;
}
