const {Schema, model} = require("mongoose")

const userSchema = new Schema({
  username: {type: String, required:true,unique: true},
  password: {type: String, required:true},
  blogs: {type: Array, default: []},
  refreshToken: String
})
const userModel = model("user", userSchema)
module.exports = userModel