import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';

describe('PoliciesController', () => {
  let policiesController: PoliciesController;
  let policiesService: PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesController],
      providers: [
        {
          provide: PoliciesService,
          useValue: {
            getPolicyById: jest.fn().mockResolvedValue({ id: '1', policyNumber: 'POL12345', details: 'Seguro de vida' }),
            createPolicy: jest.fn().mockResolvedValue({ id: '1', policyNumber: 'POL12345', details: 'Seguro de vida' }),
          },
        },
      ],
    }).compile();

    policiesController = module.get<PoliciesController>(PoliciesController);
    policiesService = module.get<PoliciesService>(PoliciesService);
  });

  it('debe retornar una póliza por ID', async () => {
    const result = await policiesController.getPolicyById('1');
    expect(result).toEqual({ id: '1', policyNumber: 'POL12345', details: 'Seguro de vida' });
  });

  it('debe crear una póliza', async () => {
    const result = await policiesController.createPolicy({
      policyNumber: 'POL12345',
      customerId: 'customer123',
      details: 'Seguro de vida',
      entityId: 'entity123',
    });
    expect(result).toEqual({ id: '1', policyNumber: 'POL12345', details: 'Seguro de vida' });
  });
});
