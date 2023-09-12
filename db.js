import mongoose from "mongoose";

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export function connect(URI) {
  mongoose.connect(URI, option);

  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB"); 
  });

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB!"); 
  });
}