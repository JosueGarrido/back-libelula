import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let customerModel: Model<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    customersService = module.get<CustomersService>(CustomersService);
    customerModel = module.get<Model<Customer>>(getModelToken(Customer.name));
  });

  it('debe encontrar un cliente por ID', async () => {
    jest.spyOn(customerModel, 'findById').mockResolvedValue({ id: '1', name: 'Cliente 1' } as any);
    const result = await customersService.getCustomerById('1');
    expect(result).toEqual({ id: '1', name: 'Cliente 1' });
  });

  it('debe crear un cliente', async () => {
    jest.spyOn(customerModel, 'create').mockResolvedValue({ id: '1', name: 'Cliente 1' } as any);
    const result = await customersService.createCustomer('Cliente 1', 'cliente1@example.com', '+123456789', 'entity123');
    expect(result).toEqual({ id: '1', name: 'Cliente 1' });
  });
});
