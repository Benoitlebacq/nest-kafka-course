import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

describe('AuthServiceController', () => {
  let authServiceController: AuthServiceController;
  const authServiceService = {
    register: jest.fn(),
    login: jest.fn(),
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [
        { provide: AuthServiceService, useValue: authServiceService },
      ],
    }).compile();

    authServiceController = app.get<AuthServiceController>(
      AuthServiceController,
    );
  });

  it('register passes email, password and name to the service', async () => {
    authServiceService.register.mockResolvedValue({
      message: 'User registered successfully',
      userId: '1',
    });
    await expect(
      authServiceController.register({
        email: 'test@email.com',
        password: 'Passw0rd!',
        name: 'Test',
      }),
    ).resolves.toEqual({
      message: 'User registered successfully',
      userId: '1',
    });
    expect(authServiceService.register).toHaveBeenCalledWith(
      'test@email.com',
      'Passw0rd!',
      'Test',
    );
  });

  it('getProfile reads the user id set by the JWT strategy', async () => {
    authServiceService.getProfile.mockResolvedValue({ id: '42' });
    await authServiceController.getProfile({ user: { userId: '42' } });
    expect(authServiceService.getProfile).toHaveBeenCalledWith('42');
  });
});
