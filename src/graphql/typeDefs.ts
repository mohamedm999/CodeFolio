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
  getProfil: Profile
  getProjets: [Project]
  getCompetences: [Skill]
  getExperiences: [Experience]

  # La query agrégée
  getPortfolio: PortfolioPayload
  }
   
  type PortfolioPayload {
  profile: Profile
  projects: [Project]
  skills: [Skill]
  experiences: [Experience]
  }

  type Query {
  getProfil: Profile
  getProjets: [Project]
  getCompetences: [Skill]
  getExperiences: [Experience]

  # La query agrégée
  getPortfolio: PortfolioPayload
  }

  type PortfolioPayload {
  profile: Profile
  projects: [Project]
  skills: [Skill]
  experiences: [Experience]
  }

  type Query {
  getProfil: Profile
  getProjets: [Project]
  getCompetences: [Skill]
  getExperiences: [Experience]

  # La query agrégée
  getPortfolio: PortfolioPayload
  }

  type PortfolioPayload {
  profile: Profile
  projects: [Project]
  skills: [Skill]
  experiences: [Experience]
  }
`;
