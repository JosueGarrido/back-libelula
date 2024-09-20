import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';

describe('EntitiesController', () => {
  let entitiesController: EntitiesController;
  let entitiesService: EntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntitiesController],
      providers: [
        {
          provide: EntitiesService,
          useValue: {
            getEntityById: jest.fn().mockResolvedValue({ id: '1', name: 'Entidad' }),
            createEntity: jest.fn().mockResolvedValue({ id: '1', name: 'Entidad' }),
          },
        },
      ],
    }).compile();

    entitiesController = module.get<EntitiesController>(EntitiesController);
    entitiesService = module.get<EntitiesService>(EntitiesService);
  });

  it('debe retornar una entidad por ID', async () => {
    const result = await entitiesController.getEntityById('1');
    expect(result).toEqual({ id: '1', name: 'Entidad' });
  });

  it('debe crear una entidad', async () => {
    const result = await entitiesController.createEntity({
      name: 'Entidad',
      address: 'Calle Falsa 123',
      contactEmail: 'contact@entidad.com',
    });
    expect(result).toEqual({ id: '1', name: 'Entidad' });
  });
});
