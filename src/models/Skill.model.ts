import { Schema, model } from 'mongoose';

const skillSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  icon: { type: String }
}, { timestamps: true });

export const Skill = model('Skill', skillSchema);
