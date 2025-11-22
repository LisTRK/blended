import { Schema, model } from "mongoose"

const userSchema = new Schema({
name: {type: String, required: true, trim: true},
email: {type: String, unique:true, required: true, trim: true },
password: {type: String, required: true, trim: true}
},
{timestamps: true}
)

userSchema.method.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
