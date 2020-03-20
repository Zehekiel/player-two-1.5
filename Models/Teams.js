var mongoose = require("mongoose")

var teamSchema = mongoose.Schema({
  name:         String,
  avatar:       String,
  philosophie:  String,
  description:  String,
  admin :       String,
  sousadmin:    String,
  regular :     String,
  actu:         String,
  idGame :      [{type: mongoose.Schema.Types.ObjectId, ref: "games"}],
  idWish:       {type: mongoose.Schema.Types.ObjectId, ref: "wishs"},
  });

  var teamModel = mongoose.model('teams', teamSchema);

  module.exports= teamModel