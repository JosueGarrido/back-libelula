import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'jwt-token' }),
            validateUser: jest
              .fn()
              .mockResolvedValue({ id: '1', email: 'test@example.com' }), // Mock para validateUser
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('debe retornar un token JWT en el login', async () => {
    const result = await authController.login({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual({ access_token: 'jwt-token' });
    expect(authService.validateUser).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    );
  });

  it('debe lanzar UnauthorizedException si validateUser retorna null', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null); // Simula que no encuentra usuario
    await expect(
      authController.login({
        email: 'invalid@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
