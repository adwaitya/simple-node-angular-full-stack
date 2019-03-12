import * as connections from  '../config/connection/connection';
import { Document, Schema, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
  _id: Types.ObjectId;
  createdAt ? : Date;
  updatedAt ? : Date;
  name: string;
  email: string;
  password:string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt : {
    type: Date,
    default: new Date(),
  },
},                                    {
  collection: 'usermodel',
  versionKey: false,
});
userSchema.pre<IUserModel>('save', function (next) {
  if (!this.isModified('password')) return next();
  console.log(`Using this: ${ this.password }`);
  // tslint:disable-next-line:no-this-assignment
  const user = this;
  // bcrypt.hash(user.password, 10, (err, hash) => {
  //   console.log('hash', hash);
  //   if (err) {
  //     console.log('err', err);
  //     return next(err);
  //   }
  // // override the cleartext password with the hashed one
  //   user.password = hash;
  //   console.log('user', user);
  //   next();
  // });
  // tslint:disable-next-line:ter-prefer-arrow-callback
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });

  return this;
});
// userSchema.pre('save', (next) => {
//   // this will run before saving
//   console.log('save', this._doc);
//   const user = this._doc;
//   // only hash the password if it has been modified (or is new)
//   // if (!user.isModified('password')) return next();
//   // bcrypt.hash(user.password, 10, (err, hash) => {
//   //   if (err) return next(err);
//   // // override the cleartext password with the hashed one
//   //   user.password = hash;
//   //   next();
//   // });
//   // if (this._doc) {
//   //   const doc: IUserModel = this._doc;
//   //   console.log('doc', doc);
//   //   const now: Date = new Date();

//   //   if (!doc.createdAt) {
//   //     doc.createdAt = now;
//   //   }
//   //  // only hash the password if it has been modified (or is new)
//   //   if (!doc.isModified('password')) return next();
//   //   bcrypt.hash(doc.password, 10, (err, hash) => {
//   //     if (err) return next(err);
//   //   // override the cleartext password with the hashed one
//   //     doc.password = hash;
//   //     next();
//   //   });
//   //   console.log('doc --', doc);
//   //   doc.updatedAt = now;
//   // }
//   next();

//   return this;
// });

async function hashPassword(user:IUserModel) {

  const password = user.password;
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds,  ((err, hash:any) => {
      if (err) {
        reject(err);
      }
      console.log(hash);
      resolve(hash);
    }));
  });

  return hashedPassword;
}

export default connections.db.model < IUserModel >('UserModel', userSchema);
