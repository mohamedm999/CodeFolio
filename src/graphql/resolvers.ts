import { Profile } from '../models/Profile.model';
import { Project } from '../models/Project.model';
import { Skill } from '../models/Skill.model';
import { Experience } from '../models/Experience.model';

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
  }
};
