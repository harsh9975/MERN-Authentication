import mongoose from "mongoose";

export const connectdb = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "meetclone",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
    mongoose.set("strictQuery", false);
  } catch (error) {
    console.log(error);
  }
};
