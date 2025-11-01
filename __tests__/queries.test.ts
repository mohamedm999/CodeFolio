import { resolvers } from '../src/graphql/resolvers';
import { Project } from '../src/models/Project.model';

jest.mock('../src/models/Project.model');

describe('Query Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProjets query', () => {
    it('should return projects for a user', async () => {
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

      (Project.find as jest.Mock).mockResolvedValue(mockProjects);

      const result = await resolvers.Query.getProjets(
        null,
        { userId: 'user123' }
      );

      expect(result).toEqual(mockProjects);
      expect(result).toHaveLength(2);
      expect(Project.find).toHaveBeenCalledWith({ userId: 'user123' });
    });

    it('should return empty array if no projects found', async () => {
      (Project.find as jest.Mock).mockResolvedValue([]);

      const result = await resolvers.Query.getProjets(
        null,
        { userId: 'user123' }
      );

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
