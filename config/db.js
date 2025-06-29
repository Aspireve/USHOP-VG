const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://1032210418:wRnyLgO7cIhIs0WR@cluster0.3js72.mongodb.net/ushop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    `Mongo database connected on ${conn.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;