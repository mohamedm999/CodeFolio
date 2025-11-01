import { resolvers } from '../src/graphql/resolvers';
import { Project } from '../src/models/Project.model';

jest.mock('../src/models/Project.model');

describe('Protected Mutation Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProjet mutation', () => {
    it('should throw error when not authenticated', async () => {
      const input = {
        title: 'New Project',
        description: 'Test project'
      };

      await expect(
        resolvers.Mutation.createProjet(null, { input }, { user: null })
      ).rejects.toThrow('Not authenticated');
    });

    it('should create project when authenticated', async () => {
      const input = {
        title: 'New Project',
        description: 'Test project',
        technologies: ['React', 'TypeScript']
      };

      const mockProject = {
        _id: 'proj123',
        userId: 'user123',
        ...input
      };

      (Project.create as jest.Mock).mockResolvedValue(mockProject);

      const context = {
        user: {
          id: 'user123',
          username: 'admin',
          role: 'Admin'
        }
      };

      const result = await resolvers.Mutation.createProjet(
        null,
        { input },
        context
      );

      expect(result).toEqual(mockProject);
      expect(Project.create).toHaveBeenCalledWith({
        ...input,
        userId: 'user123'
      });
    });
  });

  describe('updateProjet mutation', () => {
    it('should throw error when not authenticated', async () => {
      await expect(
        resolvers.Mutation.updateProjet(
          null,
          { id: 'proj123', input: { title: 'Updated' } },
          { user: null }
        )
      ).rejects.toThrow('Not authenticated');
    });

    it('should update project when authenticated', async () => {
      const input = { title: 'Updated Project' };
      const mockProject = {
        _id: 'proj123',
        userId: 'user123',
        title: 'Updated Project'
      };

      (Project.findOneAndUpdate as jest.Mock).mockResolvedValue(mockProject);

      const context = {
        user: {
          id: 'user123',
          username: 'admin',
          role: 'Admin'
        }
      };

      const result = await resolvers.Mutation.updateProjet(
        null,
        { id: 'proj123', input },
        context
      );

      expect(result).toEqual(mockProject);
      expect(Project.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: 'proj123', userId: 'user123' },
        { $set: input },
        { new: true }
      );
    });

    it('should throw error when project not found', async () => {
      (Project.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      const context = {
        user: {
          id: 'user123',
          username: 'admin',
          role: 'Admin'
        }
      };

      await expect(
        resolvers.Mutation.updateProjet(
          null,
          { id: 'proj123', input: { title: 'Updated' } },
          context
        )
      ).rejects.toThrow('Project not found');
    });
  });

  describe('deleteProjet mutation', () => {
    it('should throw error when not authenticated', async () => {
      await expect(
        resolvers.Mutation.deleteProjet(null, { id: 'proj123' }, { user: null })
      ).rejects.toThrow('Not authenticated');
    });

    it('should delete project when authenticated', async () => {
      const mockProject = { _id: 'proj123', userId: 'user123' };

      (Project.findOneAndDelete as jest.Mock).mockResolvedValue(mockProject);

      const context = {
        user: {
          id: 'user123',
          username: 'admin',
          role: 'Admin'
        }
      };

      const result = await resolvers.Mutation.deleteProjet(
        null,
        { id: 'proj123' },
        context
      );

      expect(result).toBe(true);
      expect(Project.findOneAndDelete).toHaveBeenCalledWith({
        _id: 'proj123',
        userId: 'user123'
      });
    });

    it('should return false when project not found', async () => {
      (Project.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      const context = {
        user: {
          id: 'user123',
          username: 'admin',
          role: 'Admin'
        }
      };

      const result = await resolvers.Mutation.deleteProjet(
        null,
        { id: 'proj123' },
        context
      );

      expect(result).toBe(false);
    });
  });
});
