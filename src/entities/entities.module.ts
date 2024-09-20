import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { Entity, EntitySchema } from './schemas/entity.schema';

@Module({
  imports: [
    // Registra el esquema User con MongooseModule
    MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }]),
  ],
  providers: [EntitiesService],
  controllers: [EntitiesController],
  exports: [EntitiesService],
})
export class EntitiesModule {}
