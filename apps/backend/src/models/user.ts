import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface UserInterface {
  username: string;
  password: string;
}

export const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const UserModel = mongoose.model<UserInterface>('User', UserSchema);

export default UserModel;