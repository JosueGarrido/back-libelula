import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Quote } from './schemas/quote.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cotizaciones')
@Controller('quotes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva cotización' })
  @ApiResponse({ status: 201, description: 'Cotización creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Roles('admin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.createQuote(
      createQuoteDto.quoteNumber,
      createQuoteDto.customerId,
      createQuoteDto.policyDetails,
      createQuoteDto.entityId,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una cotización por ID' })
  @ApiResponse({ status: 200, description: 'Cotización encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada' })
  @Roles('admin','cliente','broker')
  async getQuoteById(@Param('id') id: string) {
    return this.quotesService.getQuoteById(id);
  }

  @Put(':id')
  async updateQuote(@Param('id') id: string, @Body() updates: Partial<Quote>) {
    return this.quotesService.updateQuote(id, updates);
  }

  @Delete(':id')
  async deleteQuote(@Param('id') id: string) {
    return this.quotesService.deleteQuote(id);
  }
}
