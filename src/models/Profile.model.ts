import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  title: { type: String },
  bio: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  avatar: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String }
  }
}, { timestamps: true });

export const Profile = model('Profile', profileSchema);
