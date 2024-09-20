import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Document } from 'mongoose';

type UserDocument = User & Document;

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({
                _id: '1',
                email: 'test@example.com',
                password: 'hashedPassword',
                role: 'admin',
              }),
            }),
            
            create: jest.fn().mockResolvedValue({
              _id: '1',
              email: 'test@example.com',
              password: 'hashedPassword',
              role: 'admin',
            }),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('debe encontrar un usuario por ID', async () => {
    const result = await usersService.findUserById('1');
    expect(result).toEqual({
      _id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'admin',
    });
    expect(userModel.findById).toHaveBeenCalledWith('1');
  });
});
