import mongoose from "mongoose";
const incomeSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
        trim: true
    },
    subHead: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
      
        trim: true,
        default: 'completed'
    },
    amount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    TxnId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
},{timestamps:true});


const Income = mongoose.model('Transaction', incomeSchema);

module.exports = Income ;