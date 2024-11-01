import { ExpenseModel, CommentModel } from "../models/expense.js";
import UserModel from "../models/user.js";
import { Income } from "../models/Income.js";

let count = 0; // Note: This should be managed in a persistent manner, see explanation below

export const createExpense = async (req, res) => {
  try {
    // Destructure the request body
    const {
      bankName,
      subHead,
      purpose,
      amount,
      total,
      status,
      TxnId,
      expenseId,
    } = req.body;

    // Increment the count
    count++;
    console.log("Current Count:", count);

    // Get the current date and generate a voucher number
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString("en-CA");

    const voucherNo = `SMC${date}/${count}`;
    console.log("Generated Voucher No:", voucherNo);

    let expense;

    // If no TxnId is provided, create a new expense
    if (!TxnId?.trim()) {
      expense = new ExpenseModel({
        bankName,
        subHead,
        purpose,
        amount,
        total,
        status: status || "pending",
        userId: req.user._id,
        voucherNo,
      });

      await expense.save();
    } else if (expenseId) {
      // Update the existing expense if expenseId and TxnId are provided
      expense = await ExpenseModel.findById(expenseId);

      if (expense) {
        expense.TxnId = TxnId;
        await expense.save();
      } else {
        return res.status(404).json({
          message: "Expense not found to update",
        });
      }
    } else {
      return res.status(400).json({
        message:
          "Invalid request. Provide either details for a new expense or both TxnId and expenseId to update an existing one.",
      });
    }

    // Return success response
    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error("Error creating expense:", error.message);
    return res.status(500).json({
      message: "Error creating expense",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { expenseId, commentText } = req.body;
    console.log(req.body);

    const expense = await ExpenseModel.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const user = req.user;

    const newComment = await CommentModel.create({
      commentText,
      userId: user._id,
      userName: user.name,
      userRole: user.role,
    });

    expense.comments.push(newComment);

    console.log(expense);

    await expense.save();

    res.status(200).json({
      message: "Comment created successfully",
      comment: newComment,
      expenseComments: expense.comments,
    });
  } catch (error) {
    console.log("Error in creating comment: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // Get the `status` from request body
    const { id } = req.params;   // Get the `id` from request parameters

    // Update the status in the database
    const updatedStatus = await ExpenseModel.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    res.status(200).json({
      message: "Status updated successfully",
      user: updatedStatus,
    });
  } catch (error) {
    console.log("Error in updateStatus:", error.message);
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};


export const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    let getExpense;
    const user = await UserModel.findById(userId);
    const userRole = user.role;
    console.log(userRole);

    // setting conditions
    if (userRole === "accountant") {
      getExpense = await ExpenseModel.find({ status: "approved" }).populate(
        "comments",
        "userName userRole commentText createdAt"
      );
    } else if (userRole == "bursar") {
      getExpense = await ExpenseModel.find({ status: "pending" }).populate(
        "comments",
        "userName userRole commentText createdAt"
      );
    } else if (userRole == "principal") {
      getExpense = await ExpenseModel.find({ status: "verified" }).populate(
        "comments",
        "userName userRole commentText createdAt"
      );
    } else if (userRole == "admin") {
      getExpense = await ExpenseModel.find().populate(
        "comments",
        "userName userRole commentText createdAt"
      );
    } else {
      return res.status(403).json({
        message: "you are unauthorized to access data",
      });
    }
    getExpense = getExpense.reverse()
    console.log(getExpense);

    res.status(200).json({
      message: "expense get succesfulley",
      Id: userId,
      role: userRole,
      Expenses: getExpense,
    });
  } catch (error) {
    console.log("error in getting Expense ", error.message);
  }
};
export const filterExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, subHead, status, billType } = req.body;
    console.log("Body startDate:", startDate); // Log the body parameter
    console.log("Body endDate:", endDate); // Log the body parameter

    // Initialize the filter object
    const filter = {};

    // Handle date filtering: only if both startDate and endDate are provided
    if (startDate || endDate) {
      if (!startDate || !endDate) {
        return res.status(400).json({
          message: "Please provide both startDate and endDate in the format YYYY-MM-DD.",
        });
      }

      const providedStartDate = new Date(startDate);
      const providedEndDate = new Date(endDate);

      // Check if dates are valid
      if (isNaN(providedStartDate.getTime()) || isNaN(providedEndDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD." });
      }

      // Ensure the start date is before or equal to the end date
      if (providedStartDate > providedEndDate) {
        return res.status(400).json({ message: "startDate must be before or equal to endDate." });
      }

      // Set the start of the startDate and the end of the endDate
      const startOfDay = new Date(providedStartDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(providedEndDate.setHours(23, 59, 59, 999));

      console.log("Start of Day:", startOfDay); // Log startOfDay
      console.log("End of Day:", endOfDay); // Log endOfDay

      // Add the date range filter to the query
      filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    // Handle subHead filtering if provided
    if (subHead?.trim()) {
      filter.subHead = subHead;
    }

    // Handle status filtering if provided
    if (status?.trim()) {
      filter.status = status;
    }

    // Log the constructed filter object
    console.log("Filter:", filter);

    // Fetch expenses based on the dynamically constructed filter
    let result; // Declare a variable to hold the result
    if (billType === 'expense') {
      result = await ExpenseModel.find(filter);
    } else {
      result = await Income.find(filter);
    }

    // Send the response only once
    res.status(200).json(result);

  } catch (error) {
    console.error("Error fetching expenses by filters:", error);
    res.status(500).json({ message: "Server error. Could not fetch expenses." });
  }
};


//api to get rejected api
export const getAllRejectedExpenses = async (req, res) => {
  try {
    // Get all expenses with 'rejected' status
    const rejectedExpenses = await ExpenseModel.find({ status: "rejected" });

    res.status(200).json({
      message: "Rejected expenses retrieved successfully",
      rejectedExpenses: rejectedExpenses,
    });
  } catch (error) {
    console.log("Error retrieving rejected expenses: ", error.message);
    res.status(500).json({
      message: "Error retrieving rejected expenses",
      error: error.message,
    });
  }
};

// api to update expense
export const updateExpense = async (req, res) => {
  try {
    const updateFields = req.body; // Get only the fields provided in the request body
    const { id: expenseId } = req.params;
    const userId = req.user._id;

    // Authorization check
    const user = await UserModel.findById(userId);
    if (user.role !== "accountant") {
      return res.status(403).json({ message: "You are not authorized to edit expense" });
    }

    // Update only provided fields
    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      expenseId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.log("Error updating expense: ", error.message);
    res.status(500).json({
      message: "Error updating expense",
      error: error.message,
    });
  }
};


export const getTotalExpenseAmount = async (req, res) => {
  try {
    // Aggregate total of all amounts
    const totalAmount = await ExpenseModel.aggregate([
      {
        $group: {
          _id: null, 
          totalAmount: { $sum: "$total" }, 
        },
      },
    ]);

    const totalIncome = await Income.aggregate([
      {
        $group: {
          _id: null, 
          totalIncome: { $sum: "$total" }, 
        },
      },
    ]);
    const totalExpence = await ExpenseModel.countDocuments();
    const totalPendingExpenses = await ExpenseModel.countDocuments({
      status: "pending",
    });
    res.status(200).json({
      message: "Total amount calculated successfully",
      totalAmount: totalAmount,
      totalExpence: totalExpence,
      totalIncome: totalIncome,
      totalPendingExpenses: totalPendingExpenses,
    });
  } catch (error) {
    console.log("Error calculating total amount: ", error.message);
    res.status(500).json({
      message: "Error calculating total amount",
      error: error.message,
    });
  }
};

// Count total expenses with different statuses
export const getTotalExpenseStatusCount = async (req, res) => {
  try {
    // Count total expenses with different statuses
    const totalPendingExpenses = await ExpenseModel.countDocuments({
      status: "pending",
    });
    const totalCompletedExpenses = await ExpenseModel.countDocuments({
      status: "completed",
    });
    const totalApprovedExpenses = await ExpenseModel.countDocuments({
      status: "approved",
    });
    const totalRejectedExpenses = await ExpenseModel.countDocuments({
      status: "rejected",
    });
    const totalVerifiedExpenses = await ExpenseModel.countDocuments({
      status: "verified",
    });

    res.status(200).json({
      message: "Total expenses status count calculated successfully",
      totalPendingExpenses: totalPendingExpenses,
      totalCompletedExpenses: totalCompletedExpenses,
      totalApprovedExpenses: totalApprovedExpenses,
      totalRejectedExpenses: totalRejectedExpenses,
      totalVerifiedExpenses: totalVerifiedExpenses,
    });
  } catch (error) {
    console.log("Error calculating expense status count: ", error.message);
    res.status(500).json({
      message: "Error calculating expense status count",
      error: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id: expenseId } = req.params;
    const userId = req.user._id;

    const user = await UserModel.findById(userId);
    console.log(`Deleting expense with ID: ${expenseId}`); // Log the expense ID for debugging
    if (user.role !== "accountant") {
      return res.status(403).json({
        message: "you are not authorized to edit expense",
      });
    }

    // Find and delete the expense by its ID
    const deletedExpense = await ExpenseModel.findByIdAndDelete(expenseId);

    // Check if the expense was found and deleted
    if (!deletedExpense) {
      console.log("Expense not found");
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // If comments are stored in a separate collection, delete those as well
    await CommentModel.deleteMany({ _id: { $in: deletedExpense.comments } });

    // Respond with a success message
    res.status(200).json({
      message: "Expense and related comments deleted successfully",
      deletedExpense: deletedExpense,
    });
  } catch (error) {
    console.log("Error deleting expense: ", error.message);
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

export const getAllBill = async (req, res) => {
  try {
    const { billType } = req.body;
    let getBill;

    if (billType === "expense") {
      getBill = await ExpenseModel.find();
    } else {
      getBill = await Income.find();
    }
 
    getBill = getBill.reverse();

    res.status(200).json({
      message: "bill fetched succesfuly",
      bill: getBill
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
};
