import { GraphQLError } from 'graphql';
import { Profile } from '../models/Profile.model';
import { Project } from '../models/Project.model';
import { Skill } from '../models/Skill.model';
import { Experience } from '../models/Experience.model';
import { User } from '../models/User.model';
import { TokenBlacklist } from '../models/TokenBlacklist.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    getProfil: async () => {
      const user = await User.findOne();
      if (!user) return null;
      return await Profile.findOne({ userId: user._id });
    },
    
    getProjets: async () => {
      const user = await User.findOne();
      if (!user) return [];
      return await Project.find({ userId: user._id });
    },
    
    getCompetences: async () => {
      const user = await User.findOne();
      if (!user) return [];
      return await Skill.find({ userId: user._id });
    },
    
    getExperiences: async () => {
      const user = await User.findOne();
      if (!user) return [];
      return await Experience.find({ userId: user._id });
    },
    
    getPortfolio: async () => {
      const user = await User.findOne();
      if (!user) {
        return { profile: null, projects: [], skills: [], experiences: [] };
      }
      
      const [profile, projects, skills, experiences] = await Promise.all([
        Profile.findOne({ userId: user._id }),
        Project.find({ userId: user._id }),
        Skill.find({ userId: user._id }),
        Experience.find({ userId: user._id })
      ]);
      
      return { profile, projects, skills, experiences };
    }
  },

  Mutation: {
    login: async (_: any, { username, password }: { username: string; password: string }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new GraphQLError('Server configuration error', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }

      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      return { accessToken, refreshToken };
    },
    
    refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
      if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new GraphQLError('Server configuration error', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }

      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as { userId: string };
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
        return { accessToken, refreshToken };
      } catch (error) {
        throw new GraphQLError('Invalid or expired refresh token', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }
    },

    logout: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      try {
        const token = context.user.token;
        const decoded = jwt.decode(token) as any;
        
        if (!decoded || !decoded.exp) {
          throw new GraphQLError('Invalid token', {
            extensions: { code: 'UNAUTHENTICATED' }
          });
        }

        // Ajouter le token à la blacklist
        await TokenBlacklist.create({
          token,
          userId: context.user.id,
          expiresAt: new Date(decoded.exp * 1000) // exp est en secondes, Date attend des millisecondes
        });

        return true;
      } catch (error: any) {
        if (error instanceof GraphQLError) {
          throw error;
        }
        throw new GraphQLError('Logout failed', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
    },

    createProfil: async (_: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      // Vérifier si un profil existe déjà
      const existingProfile = await Profile.findOne({ userId: context.user.id });
      if (existingProfile) {
        throw new GraphQLError('Profile already exists. Use updateProfil instead.', {
          extensions: { code: 'PROFILE_ALREADY_EXISTS' }
        });
      }

      const profile = await Profile.create({
        ...input,
        userId: context.user.id
      });

      return profile;
    },

    updateProfil: async (_: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const profile = await Profile.findOneAndUpdate(
        { userId: context.user.id },
        { $set: input },
        { new: true, upsert: true }
      );

      return profile;
    },

    createProjet: async (_: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const project = await Project.create({
        ...input,
        userId: context.user.id
      });

      return project;
    },

    updateProjet: async (_: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const project = await Project.findOneAndUpdate(
        { _id: id, userId: context.user.id },
        { $set: input },
        { new: true }
      );

      if (!project) {
        throw new GraphQLError('Project not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      return project;
    },

    deleteProjet: async (_: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const result = await Project.findOneAndDelete({ _id: id, userId: context.user.id });
      return !!result;
    },

    createCompetence: async (_: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const skill = await Skill.create({
        ...input,
        userId: context.user.id
      });

      return skill;
    },

    updateCompetence: async (_: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const skill = await Skill.findOneAndUpdate(
        { _id: id, userId: context.user.id },
        { $set: input },
        { new: true }
      );

      if (!skill) {
        throw new GraphQLError('Skill not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      return skill;
    },

    deleteCompetence: async (_: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const result = await Skill.findOneAndDelete({ _id: id, userId: context.user.id });
      return !!result;
    },

    createExperience: async (_: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const experience = await Experience.create({
        ...input,
        userId: context.user.id
      });

      return experience;
    },

    updateExperience: async (_: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const experience = await Experience.findOneAndUpdate(
        { _id: id, userId: context.user.id },
        { $set: input },
        { new: true }
      );

      if (!experience) {
        throw new GraphQLError('Experience not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      return experience;
    },

    deleteExperience: async (_: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const result = await Experience.findOneAndDelete({ _id: id, userId: context.user.id });
      return !!result;
    }
  }
};
