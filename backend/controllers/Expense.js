import { ExpenseModel, CommentModel } from "../models/expense.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";

export const createExpense = async (req, res) => {
  try {
    const { id: userId } = req.params;
    
    const { bankName, subHead, purpose, amount, total, status,TxnId } = req.body;
    
    const user = await UserModel.findOne({ _id: userId });
    //  if(user.role !== 'accountant')
    //  {
    //     return res.status(500).json({
    //         message:'user is not accountant'
    //     })
    //  }
    console.log(user);
    const newExpense = new ExpenseModel({
      bankName,
      subHead,
      purpose,
      amount,
      total,
      status,
      userId,
      TxnId
    });

    await newExpense.save();

    return res.status(201).json({
      message: "Expense created successfully",
      expense: newExpense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating expense",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { id: expenseId } = req.params;
    const { commentText } = req.body;
    const expense = await ExpenseModel.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const userId = req.user._id;
    console.log("userId = " , userId)
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userRole = user.role;
    const userName = user.name;
    console.log(userRole)
    const newComment = {
      commentText,
      userRole,
      userId,
      userName,
      createdAt: Date.now(),
    };
    expense.comments.push(newComment);

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
    const { id: expenseId } = req.params;
    const { status } = req.body;
    const updatedStatus = await ExpenseModel.updateOne(
      { _id: expenseId },
      { $set: { status: status } }
    );
    console.log("update status", updatedStatus);
    res.status(200).json({
      message: "status updated uccesfully",
      user: updatedStatus,
    });
  } catch (error) {
    console.log("error in updateStatus ", error.message);
  }
};

export const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    let getExpense
    const user = await UserModel.findById(userId);
    const userRole  = user.role ;
    console.log(userRole);
     
    // setting conditions
    if(userRole === 'accountant')
    {
       getExpense = await ExpenseModel.find({'$or':[{status:'pending'},{status:'completed'}]});
    }
    else if(userRole == 'bursar')
    {
      getExpense = await ExpenseModel.find({status:'pending'});
    }
    else if(userRole == 'principal')
      {
        getExpense = await ExpenseModel.find({status:'verified'});
      }
      else if(userRole == 'admin')
        {
          getExpense = await ExpenseModel.find();
        }
        else {
     
          return res.status(403).json({
            message: "you are unauthorized to access data",
          });
        }

    res.status(200).json({
      message: "expense get succesfulley",
      Id : userId,
      role : userRole,
      Expenses: getExpense,
    });
  } catch (error) {
    console.log("error in getting Expense ", error.message);
  }
};
export const filterExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, subHead, status } = req.body;
    console.log('Body startDate:', startDate); // Log the body parameter
    console.log('Body endDate:', endDate);     // Log the body parameter

    // Initialize the filter object
    const filter = {};

    // Handle date filtering: only if both startDate and endDate are provided
    if (startDate || endDate) {
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide both startDate and endDate in the format YYYY-MM-DD.' });
      }

      const providedStartDate = new Date(startDate);
      const providedEndDate = new Date(endDate);

      // Check if dates are valid
      if (isNaN(providedStartDate.getTime()) || isNaN(providedEndDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD.' });
      }

      // Ensure the start date is before or equal to the end date
      if (providedStartDate > providedEndDate) {
        return res.status(400).json({ message: 'startDate must be before or equal to endDate.' });
      }

      // Set the start of the startDate and the end of the endDate
      const startOfDay = new Date(providedStartDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(providedEndDate.setHours(23, 59, 59, 999));

      console.log('Start of Day:', startOfDay); // Log startOfDay
      console.log('End of Day:', endOfDay);     // Log endOfDay

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
    console.log('Filter:', filter);

    // Fetch expenses based on the dynamically constructed filter
    const expenses = await ExpenseModel.find(filter);

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses by filters:', error);
    res.status(500).json({ message: 'Server error. Could not fetch expenses.' });
  }
};



// api to update expense 
export const updateExpense =async(req,res)=>{
  try {
    const updateFields = req.body;
    const {id : expenseId} = req.params;
    const userId = req.user._id
    
    const user  = await UserModel.findById(userId);
    if(user.role !== 'accountant')
    {
        return res.status(403).json({
          message:'you are not authorized to edit expense'
        })

    }

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(expenseId,
      {$set:updateFields},
      {new:true , runValidators:true}
    );
    const Expense = await ExpenseModel.findById(expenseId);
    

    console.log(' Expense', Expense)
    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense
    });
  } catch (error) {
    console.log("Error updating expense: ", error.message);
    res.status(500).json({
      message: "Error updating expense",
      error: error.message
    });
  }
};