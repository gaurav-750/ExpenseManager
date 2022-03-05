const mongoose = require('mongoose');

//Defining a Schema:
const expenseSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

});

//compiling our schema into model:
const Expense = mongoose.model('Expense', expenseSchema);

//exporting the model:
module.exports = Expense;