import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('debe encontrar un usuario por ID', async () => {
    jest
      .spyOn(userModel, 'findById')
      .mockResolvedValue({ id: '1', email: 'test@example.com' } as any);
    const result = await usersService.findUserById('1');
    expect(result).toEqual({ id: '1', email: 'test@example.com' });
  });

  it('debe crear un usuario', async () => {
    jest
      .spyOn(userModel, 'create')
      .mockResolvedValue({ id: '1', email: 'test@example.com' } as any);
    const result = await usersService.createUser(
      'test@example.com',
      'password123',
      'admin',
      'entity123',
    );
    expect(result).toEqual({ id: '1', email: 'test@example.com' });
  });
});
