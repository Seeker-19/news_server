import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backenduser",
    })
    .then((c) => console.log(`Database connected with ${c.connection}`))
    .catch((e) => console.log(e));
};
