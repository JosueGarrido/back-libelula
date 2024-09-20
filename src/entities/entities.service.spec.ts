import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesService } from './entities.service';
import { getModelToken } from '@nestjs/mongoose';
import { Entity } from './schemas/entity.schema';
import { Model, Document } from 'mongoose';

type EntityDocument = Entity & Document;

describe('EntitiesService', () => {
  let entitiesService: EntitiesService;
  let entityModel: Model<EntityDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntitiesService,
        {
          provide: getModelToken(Entity.name),
          useValue: {
            // Mock de findById con exec
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({
                _id: '1',
                name: 'Entidad Ejemplo',
                address: '123 Calle Falsa',
                contactEmail: 'entidad@example.com',
              }),
            }),
            // Mock del constructor y save
            new: jest.fn().mockImplementation((dto) => ({
              ...dto,
              save: jest.fn().mockResolvedValue(dto), // Simula el método save
            })),
          },
        },
      ],
    }).compile();

    entitiesService = module.get<EntitiesService>(EntitiesService);
    entityModel = module.get<Model<EntityDocument>>(getModelToken(Entity.name));
  });

  it('debe encontrar una entidad por ID', async () => {
    const result = await entitiesService.getEntityById('1');
    expect(result).toEqual({
      _id: '1',
      name: 'Entidad Ejemplo',
      address: '123 Calle Falsa',
      contactEmail: 'entidad@example.com',
    });
    expect(entityModel.findById).toHaveBeenCalledWith('1');
  });
});
