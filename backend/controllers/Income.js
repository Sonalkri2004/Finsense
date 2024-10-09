const express = require('express');
const mongoose = require('mongoose');
const Income = require('./models/income'); // Path to your schema file

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST request to create a new transaction
app.post('/api/income', async (req, res) => {
    try {
        // Create a new income document with data from the request body
        const income = new Income({
            bankName: req.body.bankName,
            subHead: req.body.subHead,
            status: req.body.status || 'completed', // Default to 'completed' if not provided
            amount: req.body.amount,
            total: req.body.total,
            TxnId: req.body.TxnId
        });

        // Save the new document to the database
        await income.save();

        // Respond with the created income document
        res.status(201).json(income);
    } catch (error) {
        // Catch any validation or other errors and respond with an error message
        res.status(400).json({ error: error.message });
    }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
