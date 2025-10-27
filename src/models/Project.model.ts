import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: String }],
  imageUrl: { type: String },
  demoUrl: { type: String },
  githubUrl: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export const Project = model('Project', projectSchema);
