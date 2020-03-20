var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
  mongoose.connect("mongodb+srv://admin:htM(9C8!R6_m_@p2-ag5ug.mongodb.net/playertwo?retryWrites=true&w=majority",
  options,
  function(err) {
  console.log(err);
  }
  );

  module.exports= mongoose
