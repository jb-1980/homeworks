const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs")

// define the schema for our user model
const userSchema = mongoose.Schema({
  householdMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  local: {
    firstname: String,
    lastname: String,
    username: String,
    username_slug: String,
    password: String
  }
  // TODO: Generate other auth methods
  // facebook:{
  //     id:String,
  //     token:String,
  //     email:String,
  //     name:String
  // },
  // twitter:{
  //     id:String,
  //     token:String,
  //     displayName:String,
  //     username:String
  // },
  // google:{
  //     id:String,
  //     token:String,
  //     email:String,
  //     name:String
  // }
})

// methods =================================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

// create a valid url slug for username
userSchema.methods.slugify = function(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

//create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema)
