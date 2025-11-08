import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// 1. Create empty mock for AuthService
const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    // 2. Provide mock service 
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks(); // Clear mock history after each test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test endpoint POST /auth/users
  describe('register', () => {
    it('should call authService.register with correct data', async () => {
      const dto: RegisterDto = {
        fullname: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      
      const expectedResult = { userId: '1', ...dto };
      // Simulate service that returns results
      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(dto);

      // Check if the service is called correctly with the DTO
      expect(service.register).toHaveBeenCalledWith(dto);
      // Check if the controller returns the correct result from the service
      expect(result).toEqual(expectedResult);
    });
  });

  // Test endpoint POST /auth/tokens
  describe('login', () => {
    it('should call authService.login with correct data', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      
      const expectedResult = { userId: '1', data: { email: dto.email } };
      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(dto);

      expect(service.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});