import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { Policy } from './schemas/policy.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Polizas')
@Controller('policies')
@UseGuards(JwtAuthGuard,RolesGuard)
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva póliza' })
  @ApiResponse({ status: 201, description: 'Póliza creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Roles('admin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPolicy(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.createPolicy(
      createPolicyDto.policyNumber,
      createPolicyDto.customerId,
      createPolicyDto.details,
      createPolicyDto.entityId,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una póliza por ID' })
  @ApiResponse({ status: 200, description: 'Póliza encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Póliza no encontrada' })
  @Roles('admin','cliente','broker')
  async getPolicyById(@Param('id') id: string) {
    return this.policiesService.getPolicyById(id);
  }

  @Put(':id')
  async updatePolicy(@Param('id') id: string, @Body() updates: Partial<Policy>) {
    return this.policiesService.updatePolicy(id, updates);
  }

  @Delete(':id')
  async deletePolicy(@Param('id') id: string) {
    return this.policiesService.deletePolicy(id);
  }
}
