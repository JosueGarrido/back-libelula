import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({ example: 'QUO12345', description: 'Número de la cotización' })
  @IsString()
  @IsNotEmpty()
  quoteNumber: string;

  @ApiProperty({ example: 'customer123', description: 'ID del cliente asociado' })
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'Detalles de la póliza propuesta', description: 'Detalles de la póliza propuesta' })
  @IsString()
  policyDetails: string;

  @ApiProperty({ example: 'entity123', description: 'ID de la entidad asociada' })
  @IsNotEmpty()
  entityId: string;
}
