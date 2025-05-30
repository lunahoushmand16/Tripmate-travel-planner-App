import { Schema, model, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+@.+\\..+/ },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare input password with hashed password
userSchema.methods.isCorrectPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', userSchema);
