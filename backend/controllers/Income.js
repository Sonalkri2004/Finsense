import { Income } from "../models/Income.js";
import { ExpenseModel } from "../models/expense.js";

export const createIncome = async (req, res) => {
  try {
    // Destructure the request body
    const { bankName, head, subHead, status, amount, total, TxnId } = req.body;

    // Create a new Income instance with the destructured values
    const income = new Income({
      bankName,
      head,
      subHead,
      status: status || "completed",
      amount,
      total,
      TxnId,
    });

    // Save the new income document
    await income.save();

    // Respond with success
    res.status(201).json({
      data: income,
      message: "Income created!!",
    });
  } catch (error) {
    console.log("Error in creating income transaction: ", error.message);
    res.status(500).json({
      message: "Error creating income transaction",
      error: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id: incomeId } = req.params;
    console.log(`Deleting Income with ID: ${incomeId}`); // Log the Income ID for debugging

    // Find and delete the Income by its ID
    const deletedIncome = await Income.findByIdAndDelete(incomeId);

    // Check if the Income was found and deleted
    if (!deletedIncome) {
      console.log("Income not found");
      return res.status(404).json({
        message: "Income not found",
      });
    }

    // Respond with a success message
    res.status(200).json({
      message: "Income deleted successfully",
      deletedIncome: deletedIncome,
    });
  } catch (error) {
    console.log("Error deleting Income: ", error.message);
    res.status(500).json({
      message: "Error deleting Income",
      error: error.message,
    });
  }
};

// get all Income
export const getAllBill = async (req, res) => {
  try {
    const { billType } = req.body;
    let getBill;

    if (billType === "expense") {
      getBill = await ExpenseModel.find();
    } else {
      getBill = await Income.find();
    }

    res.status(200).json({
      message: "bill fetched succesfuly",
      bill: getBill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
};
