import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  birthdate: { type: Date },
  address: { type: String },
  phoneNumber: { type: String },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);