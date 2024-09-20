import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue({
              _id: '1',
              _doc: {
                email: 'test@example.com',
                _id: '1',
                role: 'admin',
              },
              password: 'hashedPassword',
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('debe validar un usuario y retornar un token JWT', async () => {
    const result = await authService.login({
      _doc: {
        email: 'test@example.com',
        _id: '1',
        role: 'admin',
      },
    });
    expect(result).toEqual({ access_token: 'jwt-token' });
  });

  it('debe retornar null si el usuario no existe', async () => {
    jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(null);

    const result = await authService.validateUser(
      'nonexistent@example.com',
      'password123',
    );
    expect(result).toBeNull();
  });

  it('debe retornar null si la contraseña es incorrecta', async () => {
    jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue({
      role: 'admin',
      email: 'test@example.com',
      password: 'hashedPassword',
      entityId: '123',
    });

    const result = await authService.validateUser(
      'test@example.com',
      'wrongPassword',
    );
    expect(result).toBeNull();
  });
});
