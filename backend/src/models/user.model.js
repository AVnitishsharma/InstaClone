import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true || "Username already exists"
  },
  email: {
    type: String,
    required: true,
    unique: true || "Email already exists"
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('User', userSchema);
export default userModel;