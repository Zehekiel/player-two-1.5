var mongoose = require("mongoose")

var userSchema = mongoose.Schema({
  pseudo:       String,
  sexe:         String,
  langue:       String,
  mail:         String,
  password :    String,
  salt:         String,
  token :       String,
  description:  String,
  birthday:     Date,
  avatar :      String,
  CP:           Number,
  service:      Array,
  battletag:    String,
  playerTwo :   [{type: mongoose.Schema.Types.ObjectId, ref:"users"}],
  blacklist:    [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
  idGame :      [{type: mongoose.Schema.Types.ObjectId, ref: "games"}],
  idWish:       [{type: mongoose.Schema.Types.ObjectId, ref: "wishs"}],
  // categoryPref : String,
  // équipement :   String,

  });

  var UserModel = mongoose.model('users', userSchema);

  module.exports= UserModel;