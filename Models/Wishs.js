var mongoose = require("mongoose")

var wishSchema = mongoose.Schema({
  idGame :        [{type: mongoose.Schema.Types.ObjectId, ref: "games"}],
  plateforme:     String,
  mode:           String,
  age:            String,
  disponibility:  String,
  sexe:           String,
  langue:         String,
  team :          Boolean,
  });

  var wishModel = mongoose.model('wishs', wishSchema);

  module.exports= wishModel