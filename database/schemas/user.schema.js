import mongoose from "mongoose";
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    password: {type: String, required: true },
    email: { type: String,unique: true , required: true },
    date: {type: Date, default: Date.now}
});

userSchema.methods.comparePassword = async (password, cb) => {
  bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

export default userSchema;