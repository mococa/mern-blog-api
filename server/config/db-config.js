import mongoose from "mongoose";
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const connection = () => {
  return new Promise((res) => {
    mongoose.connect(process.env.MONGO_URI, config);
    const connection = mongoose.connection;

    connection.once("open", () => {
      res(connection);
    });
  });
};
