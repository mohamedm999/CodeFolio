export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
  }

  type Profile {
    id: ID!
    userId: ID!
    name: String!
    title: String
    bio: String
    email: String
    phone: String
    location: String
    avatar: String
    socialLinks: SocialLinks
  }

  type SocialLinks {
    github: String
    linkedin: String
    twitter: String
    website: String
  }

  type Project {
    id: ID!
    userId: ID!
    title: String!
    description: String
    technologies: [String!]
    imageUrl: String
    demoUrl: String
    githubUrl: String
    startDate: String
    endDate: String
    featured: Boolean
  }

  type Skill {
    id: ID!
    userId: ID!
    name: String!
    category: String!
    level: String
    icon: String
  }

  type Experience {
    id: ID!
    userId: ID!
    company: String!
    position: String!
    description: String
    startDate: String!
    endDate: String
    current: Boolean
    location: String
    technologies: [String!]
  }

  type Query {
    getProfil(userId: ID!): Profile
    getProjets(userId: ID!): [Project]
    getCompetences(userId: ID!): [Skill]
    getExperiences(userId: ID!): [Experience]
    getPortfolio(userId: ID!): PortfolioPayload
  }
   
  type PortfolioPayload {
    profile: Profile
    projects: [Project]
    skills: [Skill]
    experiences: [Experience]
  }

  input SocialLinksInput {
    github: String
    linkedin: String
    twitter: String
    website: String
  }

  input UpdateProfileInput {
    name: String
    title: String
    bio: String
    email: String
    phone: String
    location: String
    avatar: String
    socialLinks: SocialLinksInput
  }

  input CreateProjectInput {
    title: String!
    description: String
    technologies: [String!]
    imageUrl: String
    demoUrl: String
    githubUrl: String
    startDate: String
    endDate: String
    featured: Boolean
  }

  input UpdateProjectInput {
    title: String
    description: String
    technologies: [String!]
    imageUrl: String
    demoUrl: String
    githubUrl: String
    startDate: String
    endDate: String
    featured: Boolean
  }

  input CreateSkillInput {
    name: String!
    category: String!
    level: String
    icon: String
  }

  input UpdateSkillInput {
    name: String
    category: String
    level: String
    icon: String
  }

  input CreateExperienceInput {
    company: String!
    position: String!
    description: String
    startDate: String!
    endDate: String
    current: Boolean
    location: String
    technologies: [String!]
  }

  input UpdateExperienceInput {
    company: String
    position: String
    description: String
    startDate: String
    endDate: String
    current: Boolean
    location: String
    technologies: [String!]
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    refreshToken(refreshToken: String!): AuthPayload
    
    updateProfil(input: UpdateProfileInput!): Profile
    
    createProjet(input: CreateProjectInput!): Project
    updateProjet(id: ID!, input: UpdateProjectInput!): Project
    deleteProjet(id: ID!): Boolean
    
    createCompetence(input: CreateSkillInput!): Skill
    updateCompetence(id: ID!, input: UpdateSkillInput!): Skill
    deleteCompetence(id: ID!): Boolean
    
    createExperience(input: CreateExperienceInput!): Experience
    updateExperience(id: ID!, input: UpdateExperienceInput!): Experience
    deleteExperience(id: ID!): Boolean
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }
`;
