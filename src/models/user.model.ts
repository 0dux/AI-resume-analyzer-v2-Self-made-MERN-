import mongoose from "mongoose";

interface user {
  fullName: string;
  email: string;
  password: string;
  Resume: Resume[];
}

interface Resume {
  pdfUrl: string;
  imageUrl: string;
  feedback?: string;
  uploadedAt: Date;
}

const resumeSchema = new mongoose.Schema<Resume>({
  pdfUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
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
    validate: {
      validator: function (val: Resume[]) {
        return val.length <= 4;
      },
      message: "You can upload a maximum of 4 resumes",
    },
    default: [],
  },
});

export const User = mongoose.model<user>("User", userSchema);
