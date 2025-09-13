import mongoose, { Types } from "mongoose";

interface user {
  fullName: string;
  email: string;
  password: string;
  resumes: Resume[];
}

interface Resume {
  _id?: Types.ObjectId;
  pdfUrl: string;
  feedback?: string;
  uploadedAt?: Date;
}

const resumeSchema = new mongoose.Schema<Resume>({
  pdfUrl: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  resumes: {
    type: [resumeSchema],
    default: [],
  },
});

export const User = mongoose.model<user>("User", userSchema);
