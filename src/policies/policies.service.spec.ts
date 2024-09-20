import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Policy } from './schemas/policy.schema';
import { Model, Document } from 'mongoose';

type PolicyDocument = Policy & Document;

describe('PoliciesService', () => {
  let policiesService: PoliciesService;
  let policyModel: Model<PolicyDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoliciesService,
        {
          provide: getModelToken(Policy.name),
          useValue: {
            
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({
                _id: '1',
                policyNumber: 'POL12345',
                customerId: 'customer123',
                details: 'Detalles de la póliza',
                entityId: 'entity123',
              }),
            }),
            
            new: jest.fn().mockImplementation((dto) => ({
              ...dto,
              save: jest.fn().mockResolvedValue(dto), 
            })),
          },
        },
      ],
    }).compile();

    policiesService = module.get<PoliciesService>(PoliciesService);
    policyModel = module.get<Model<PolicyDocument>>(getModelToken(Policy.name));
  });

  it('debe encontrar una póliza por ID', async () => {
    const result = await policiesService.getPolicyById('1');
    expect(result).toEqual({
      _id: '1',
      policyNumber: 'POL12345',
      customerId: 'customer123',
      details: 'Detalles de la póliza',
      entityId: 'entity123',
    });
    expect(policyModel.findById).toHaveBeenCalledWith('1');
  });
});
