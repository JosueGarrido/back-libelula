import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue({
              id: '1',
              email: 'test@example.com',
              role: 'admin',
            }),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    usersService = module.get<UsersService>(UsersService);
  });

  it('debe validar el token JWT y retornar el usuario', async () => {
    const payload = { sub: '1', email: 'test@example.com' };
    const result = await jwtStrategy.validate(payload);
    expect(result).toEqual({
      userId: '1',
      email: 'test@example.com',
      role: 'admin',
    });
  });

  it('debe lanzar un error si el usuario no existe', async () => {
    jest.spyOn(usersService, 'findUserById').mockResolvedValue(null);

    const payload = { sub: '1', email: 'nonexistent@example.com' };
    await expect(jwtStrategy.validate(payload)).rejects.toThrow();
  });
});
