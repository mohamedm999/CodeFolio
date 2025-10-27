import { Schema, model } from 'mongoose';

const experienceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  location: { type: String },
  technologies: [{ type: String }]
}, { timestamps: true });

export const Experience = model('Experience', experienceSchema);
