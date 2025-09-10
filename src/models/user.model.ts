import mongoose from "mongoose";

interface user {
  fullName: string;
  email: string;
  password: string;
  Resume: string[];
}

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
  Resume: {
    type: [String],
    validate: {
      validator: function (val: string[]) {
        return val.length <= 4;
      },
      message: "You can upload a maximum of 4 resumes",
    },
    default: [],
  },
});

export const User = mongoose.model<user>("User", userSchema);
