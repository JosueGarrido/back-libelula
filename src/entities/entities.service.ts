import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, EntityDocument } from './schemas/entity.schema';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectModel(Entity.name) private entityModel: Model<EntityDocument>,
  ) {}

  async createEntity(
    name: string,
    address: string,
    contactEmail: string,
  ): Promise<Entity> {
    const entity = new this.entityModel({ name, address, contactEmail });
    return entity.save();
  }

  async getEntityById(id: string): Promise<Entity> {
    return this.entityModel.findById(id).exec();
  }

  async updateEntity(id: string, updates: Partial<Entity>): Promise<Entity> {
    return this.entityModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async deleteEntity(id: string): Promise<Entity> {
    return this.entityModel.findByIdAndDelete(id).exec();
  }
}
