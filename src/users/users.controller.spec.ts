import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
            createUser: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('debe retornar un usuario por ID', async () => {
    const result = await usersController.getUserById('1');
    expect(result).toEqual({ id: '1', email: 'test@example.com' });
  });

  it('debe crear un usuario', async () => {
    const result = await usersController.createUser({
      email: 'test@example.com',
      password: 'password123',
      role: 'admin',
      entityId: 'entity123',
    });
    expect(result).toEqual({ id: '1', email: 'test@example.com' });
  });
});
