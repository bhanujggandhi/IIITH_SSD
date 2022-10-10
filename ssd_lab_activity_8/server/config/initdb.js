const mongoose = require("mongoose");

const uri =
  "mongodb+srv://bhanujggandhi:bhanujggandhi@cluster0.ml2u28o.mongodb.net/?retryWrites=true&w=majority";

const InitDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo");
  } catch (e) {
    console.error(e);
  }
};

module.exports = InitDB;
