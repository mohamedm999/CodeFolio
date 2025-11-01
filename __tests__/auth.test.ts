import { resolvers } from '../src/graphql/resolvers';
import { User } from '../src/models/User.model';
import bcrypt from 'bcryptjs';

jest.mock('../src/models/User.model');

describe('Authentication Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
    delete process.env.JWT_REFRESH_SECRET;
  });

  describe('login mutation', () => {
    it('should return tokens for valid credentials', async () => {
      process.env.JWT_SECRET = 'test-secret';
      process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
      const mockUser = {
        _id: 'user123',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10)
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await resolvers.Mutation.login(
        null,
        { username: 'admin', password: 'admin123' }
      );

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(typeof result.accessToken).toBe('string');
      expect(typeof result.refreshToken).toBe('string');
    });

    it('should throw error for invalid username', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        resolvers.Mutation.login(null, { username: 'wrong', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for invalid password', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10)
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        resolvers.Mutation.login(null, { username: 'admin', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
