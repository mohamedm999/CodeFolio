import { resolvers } from '../src/graphql/resolvers';
import { Project } from '../src/models/Project.model';
import { User } from '../src/models/User.model';

jest.mock('../src/models/Project.model');
jest.mock('../src/models/User.model');

describe('Query Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProjets query', () => {
    it('should return projects for a user', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'admin'
      };

      const mockProjects = [
        {
          _id: 'proj1',
          userId: 'user123',
          title: 'Project 1',
          description: 'Test project'
        },
        {
          _id: 'proj2',
          userId: 'user123',
          title: 'Project 2',
          description: 'Another project'
        }
      ];

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (Project.find as jest.Mock).mockResolvedValue(mockProjects);

      const result = await resolvers.Query.getProjets();

      expect(result).toEqual(mockProjects);
      expect(result).toHaveLength(2);
      expect(User.findOne).toHaveBeenCalled();
      expect(Project.find).toHaveBeenCalledWith({ userId: mockUser._id });
    });

    it('should return empty array if no user found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await resolvers.Query.getProjets();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(User.findOne).toHaveBeenCalled();
    });

    it('should return empty array if no projects found', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'admin'
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (Project.find as jest.Mock).mockResolvedValue([]);

      const result = await resolvers.Query.getProjets();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
