import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let customersController: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            getCustomerById: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Cliente 1',
              email: 'cliente1@example.com',
            }),
            createCustomer: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Cliente 1',
              email: 'cliente1@example.com',
            }),
          },
        },
      ],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
  });

  it('debe retornar un cliente por ID', async () => {
    const result = await customersController.getCustomerById('1');
    expect(result).toEqual({
      id: '1',
      name: 'Cliente 1',
      email: 'cliente1@example.com',
    });
  });

  it('debe crear un cliente', async () => {
    const result = await customersController.createCustomer({
      name: 'Cliente 1',
      email: 'cliente1@example.com',
      phone: '+123456789',
      entityId: 'entity123',
    });
    expect(result).toEqual({
      id: '1',
      name: 'Cliente 1',
      email: 'cliente1@example.com',
    });
  });
});
