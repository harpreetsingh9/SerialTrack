import mongoose from "mongoose";

export async function connect() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection Error, Please try again. " + err);
      process.exit();
    });
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
}
