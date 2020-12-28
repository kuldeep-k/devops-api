const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  enabled: { type: Boolean, default: true },
  }, {
    timestamps: true,
  });


userSchema.set('toObject');
userSchema.set('toJSON');

const User = mongoose.model('user', userSchema);
module.exports = User;
