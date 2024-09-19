import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyDto {
  @ApiProperty({ example: 'POL12345', description: 'Número de la póliza' })
  @IsString()
  @IsNotEmpty()
  policyNumber: string;

  @ApiProperty({ example: 'customer123', description: 'ID del cliente asociado' })
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'Seguro de salud', description: 'Detalles de la póliza' })
  @IsString()
  details: string;

  @ApiProperty({ example: 'entity123', description: 'ID de la entidad asociada' })
  @IsNotEmpty()
  entityId: string;
}
