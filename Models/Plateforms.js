var mongoose = require("mongoose")

var plateformSchema = mongoose.Schema({
  plateform:     String,
  img:           String,
  service:       Array,
  });

  var plateformModel = mongoose.model('plateforms', plateformSchema);

  module.exports= plateformModel