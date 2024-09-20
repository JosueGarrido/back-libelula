import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy } from './schemas/policy.schema';

describe('PoliciesService', () => {
  let policiesService: PoliciesService;
  let policyModel: Model<Policy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoliciesService,
        {
          provide: getModelToken(Policy.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    policiesService = module.get<PoliciesService>(PoliciesService);
    policyModel = module.get<Model<Policy>>(getModelToken(Policy.name));
  });

  it('debe encontrar una póliza por ID', async () => {
    jest
      .spyOn(policyModel, 'findById')
      .mockResolvedValue({ id: '1', policyNumber: 'POL12345' } as any);
    const result = await policiesService.getPolicyById('1');
    expect(result).toEqual({ id: '1', policyNumber: 'POL12345' });
  });

  it('debe crear una póliza', async () => {
    jest
      .spyOn(policyModel, 'create')
      .mockResolvedValue({ id: '1', policyNumber: 'POL12345' } as any);
    const result = await policiesService.createPolicy(
      'POL12345',
      'customer123',
      'Seguro de vida',
      'entity123',
    );
    expect(result).toEqual({ id: '1', policyNumber: 'POL12345' });
  });
});
