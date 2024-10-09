import { Income } from '../models/Income.js';

export const createIncome = async (req, res) => {
    try {
        const income = new Income({
            bankName: req.body.bankName,
            subHead: req.body.subHead,
            status: req.body.status || 'completed',
            amount: req.body.amount,
            total: req.body.total,
            TxnId: req.body.TxnId
        });
        await income.save();

        res.status(201).json({
            data: income,
            message: "Income created!!"
        });
    } catch (error) {
        console.log("error in creating income transaction ", error.message);
    }
}