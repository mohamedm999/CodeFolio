import { Profile } from '../models/Profile.model';
import { Project } from '../models/Project.model';
import { Skill } from '../models/Skill.model';
import { Experience } from '../models/Experience.model';
import { User } from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    getProfil: async (_: any, { userId }: { userId: string }) => {
      return await Profile.findOne({ userId });
    },
    
    getProjets: async (_: any, { userId }: { userId: string }) => {
      return await Project.find({ userId });
    },
    
    getCompetences: async (_: any, { userId }: { userId: string }) => {
      return await Skill.find({ userId });
    },
    
    getExperiences: async (_: any, { userId }: { userId: string }) => {
      return await Experience.find({ userId });
    },
    
    getPortfolio: async (_: any, { userId }: { userId: string }) => {
      const [profile, projects, skills, experiences] = await Promise.all([
        Profile.findOne({ userId }),
        Project.find({ userId }),
        Skill.find({ userId }),
        Experience.find({ userId })
      ]);
      
      return { profile, projects, skills, experiences };
    }
  },

  Mutation: {
    login: async (_: any, { username, password }: { username: string; password: string }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new Error('JWT secrets not configured');
      }

      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      return { accessToken, refreshToken };
    }
  
    ,
    refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
      if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new Error('JWT secrets not configured');
      }

      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as { userId: string };
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
        return { accessToken, refreshToken };
      } catch (error) {
        throw new Error('Invalid refresh token');
      }
    }
  }
};
