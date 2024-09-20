import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesService } from './entities.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from './schemas/entity.schema';

describe('EntitiesService', () => {
  let entitiesService: EntitiesService;
  let entityModel: Model<Entity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntitiesService,
        {
          provide: getModelToken(Entity.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    entitiesService = module.get<EntitiesService>(EntitiesService);
    entityModel = module.get<Model<Entity>>(getModelToken(Entity.name));
  });

  it('debe encontrar una entidad por ID', async () => {
    jest.spyOn(entityModel, 'findById').mockResolvedValue({ id: '1', name: 'Entidad' } as any);
    const result = await entitiesService.getEntityById('1');
    expect(result).toEqual({ id: '1', name: 'Entidad' });
  });

  it('debe crear una entidad', async () => {
    jest.spyOn(entityModel, 'create').mockResolvedValue({ id: '1', name: 'Entidad' } as any);
    const result = await entitiesService.createEntity('Entidad', 'Calle Falsa 123', 'contact@entidad.com');
    expect(result).toEqual({ id: '1', name: 'Entidad' });
  });
});
