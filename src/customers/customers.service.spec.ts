import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model, Document } from 'mongoose';

type CustomerDocument = Customer & Document;

describe('CustomersService', () => {
  let customersService: CustomersService;
  let customerModel: Model<CustomerDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            // Mock de findById con exec
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({
                _id: '1',
                name: 'Cliente 1',
                email: 'cliente1@example.com',
                phone: '+123456789',
                entityId: 'entity123',
              }),
            }),
            // Mock del constructor
            new: jest.fn().mockImplementation((dto) => ({
              ...dto,
              save: jest.fn().mockResolvedValue(dto), // Simulamos el método save
            })),
          },
        },
      ],
    }).compile();

    customersService = module.get<CustomersService>(CustomersService);
    customerModel = module.get<Model<CustomerDocument>>(
      getModelToken(Customer.name),
    );
  });

  it('debe encontrar un cliente por ID', async () => {
    const result = await customersService.getCustomerById('1');
    expect(result).toEqual({
      _id: '1',
      name: 'Cliente 1',
      email: 'cliente1@example.com',
      phone: '+123456789',
      entityId: 'entity123',
    });
    expect(customerModel.findById).toHaveBeenCalledWith('1');
  });
});
