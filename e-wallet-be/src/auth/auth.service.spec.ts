import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// 1. Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// 2. create an obj mock for PrismaService
const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    mockPrismaService.user.create.mockReset();
    mockPrismaService.user.findUnique.mockReset();
    (bcrypt.hash as jest.Mock).mockReset();
    (bcrypt.compare as jest.Mock).mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // === Test func Register ===
  describe('register', () => {
    it('should register a new user successfully (happy path)', async () => {
      const dto = {
        email: 'test@example.com',
        fullname: 'Test User',
        password: 'password123',
      };
      const hashedPassword = 'hashedPassword123';
      const userResult = {
        userId: '1',
        email: dto.email,
        fullname: dto.fullname,
        password: hashedPassword,
      };

      // bcrypt.hash
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(userResult);

      const result = await service.register(dto);

      // 4. Check that the functions were called correctly
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          fullname: dto.fullname,
          password: hashedPassword,
        },
      });
      // The returned result must not contain a password
      expect(result).toEqual({
        userId: '1',
        email: dto.email,
        fullname: dto.fullname,
      });
    });

    it('should throw ConflictException if email already exists (sad path)', async () => {
      const dto = {
        email: 'test@example.com',
        fullname: 'Test User',
        password: 'password123',
      };
      const hashedPassword = 'hashedPassword123';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      // 5.Error P2002 (Unique constraint failed) from Prisma emulator
      const prismaError = {
        code: 'P2002',
        message: 'Email already exists',
        meta: { target: ['email'] },
        name: 'PrismaClientKnownRequestError',
      };

      mockPrismaService.user.create.mockRejectedValue(prismaError);

      // expected value service throw ConflictException
      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  // === Test func Login ===
  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const user = {
      userId: '1',
      email: loginDto.email,
      fullname: 'Test User',
      password: 'hashedPassword123',
    };

    it('should login successfully and return user data (happy path)', async () => {
      // user found emulator
      mockPrismaService.user.findUnique.mockResolvedValue(user);
      // compare password return true
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        user.password,
      );
      expect(result).toEqual({
        data: {
          userId: user.userId,
          email: user.email,
          fullname: user.fullname,
        },
        userId: user.userId,
      });
    });

    it('should throw UnauthorizedException if user not found (sad path)', async () => {
      // user not found emulator
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password incorrect (sad path)', async () => {
      // user found emulator
      mockPrismaService.user.findUnique.mockResolvedValue(user);
      // compare password return false emulator
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

//   --- Test func Register ---
  describe('register (generic error)', () => {
    it('should throw a generic error if registration fails unexpectedly', async () => {
      const dto = {
        email: 'test@example.com',
        fullname: 'Test User',
        password: 'password123',
      };
      const hashedPassword = 'hashedPassword123';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      // 6. Simulate a general error (not P2002)
      const genericError = new Error('Database is down');
      mockPrismaService.user.create.mockRejectedValue(genericError);

      // Expect the service to throw that exact error.
      await expect(service.register(dto)).rejects.toThrow(Error);
      await expect(service.register(dto)).rejects.toThrow('Database is down');

      // Make sure it doesn't throw ConflictException
      await expect(service.register(dto)).rejects.not.toThrow(
        ConflictException,
      );
    });
  });
});

