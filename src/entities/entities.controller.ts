import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { Entity } from './schemas/entity.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEntityDto } from './dto/create-entity.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Entidades')
@Controller('entities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva entidad' })
  @ApiResponse({ status: 201, description: 'Entidad creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Roles('admin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createEntity(@Body() createEntityDto: CreateEntityDto) {
    return this.entitiesService.createEntity(
      createEntityDto.name,
      createEntityDto.address,
      createEntityDto.contactEmail,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una entidad por ID' })
  @ApiResponse({ status: 200, description: 'Entidad encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Entidad no encontrada' })
  @Roles('admin', 'cliente', 'broker')
  async getEntityById(@Param('id') id: string) {
    return this.entitiesService.getEntityById(id);
  }

  @Put(':id')
  async updateEntity(
    @Param('id') id: string,
    @Body() updates: Partial<Entity>,
  ) {
    return this.entitiesService.updateEntity(id, updates);
  }

  @Delete(':id')
  async deleteEntity(@Param('id') id: string) {
    return this.entitiesService.deleteEntity(id);
  }
}
