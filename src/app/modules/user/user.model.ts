import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

const userSchema = new Schema <IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true},
        role: { type: String, enum: ["admin", "user"], default: "user" },
        isBlocked: { type: Boolean, default: false },
      }, {
        timestamps: true,
      }
  );

  // bcrypting (hashing) password
  userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round));
    next();
  })

  // implementing empty string as a password for not showing from view end 
  userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next();
  })

export const UserModel = model<IUser>('User', userSchema);