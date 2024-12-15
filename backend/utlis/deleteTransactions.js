// Import Mongoose
import mongoose from "mongoose";

// MongoDB connection URI
const uri = process.env.MONGODB_URL;
// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Function to delete all transactions
const deleteAllTransactions = async () => {
  try {
    const db = mongoose.connection;
    const result = await db.collection("comments").deleteMany({});
    console.log(`${result.deletedCount} expenses deleted successfully.`);
  } catch (error) {
    console.error("Error deleting expenses:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Call the function
deleteAllTransactions();
