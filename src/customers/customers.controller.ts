import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './schemas/customer.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Clientes')
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Roles('admin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(
      createCustomerDto.name,
      createCustomerDto.email,
      createCustomerDto.phone,
      createCustomerDto.entityId,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @Roles('admin', 'cliente', 'broker')
  async getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updates: Partial<Customer>,
  ) {
    return this.customersService.updateCustomer(id, updates);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }
}
