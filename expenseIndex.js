//setting our express server:
const express = require('express');

//including the file:
const db = require('./config/mongoose');

//require the contact.js file:
const Expense = require('./Models/expenses');
// 'Expense' will be used to populate contacts


// importing 'path' module:
const path = require('path');
const { title } = require('process');

const app = express();
const port = 2078;

//setting the view path:
app.set('views', path.join(__dirname, 'views'));

//using ejs as our view engine:
app.set('view engine', 'ejs');

//parsing data from browser:
app.use(express.urlencoded({extended: true}));

//For accessing static files (css, js):
app.use(express.static('assets'));

var expenses = [
    {date: '28-02-2022', amount: 1400}
];



//Fetching data to the screen:
app.get('/', function(req, res){

    var totalAmountSpent = 0;
    Expense.find({}, function(err, expenses){
        if (err) {
            console.log('Error in fetching expenses from db!');
            return;
        }
        //expenses here is an array of objects:

        expenses.forEach(function(item){
            // console.log(item.amount);
            totalAmountSpent+= item.amount; 
        })

        //to render the html file to browser:
        return res.render('home', {
            expense_list: expenses,
            total: totalAmountSpent
        });
    })
    
})


app.post('/addExpenses', function(req, res){
    // console.log(req.body);

    //formatting the input date to - 'dd-mm-yyyy' format
    let dateFromUser = String(req.body.inputDate);

    var dd = dateFromUser.substring(8);
    var mm = dateFromUser.substring(5, 7);
    var yy = dateFromUser.substring(0, 4);
    var inputDate = dd + '-' + mm + '-'+ yy;
    if (inputDate == '--' ||req.body.inputAmount == '') {
        console.log('Cannot Add Expense!');
        return;
    }

    //Inserting into our database 'expenses_db':
    Expense.create({
        date: inputDate,
        amount: req.body.inputAmount,
    }, function(err, addExpense){
        if (err) {
            console.log('Error in adding expense!');
            return;
        }

        console.log('addEx:', addExpense);
        res.redirect('/');
    })

})


//'UPDATION' IN MONGOOSE:
Expense.updateOne({_id : '621dca5d4a18d9ab86330b19'}, {amount: 35}, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log('Updated Successfully!');
    }
})


//Deleting an expense (date):
app.get('/deleteExpense/:id', function(req, res){
    console.log(req.params);

    //getting the id of the date to be deleted:
    let idToBeDeleted = req.params.id;
    // console.log(idToBeDeleted.amount);
    Expense.findByIdAndDelete(idToBeDeleted, function(err, doc){
        if (err) {
        console.log('Error in deleting the date!');
        return;
        }

        console.log('deleted:', doc);
    });

    res.redirect('/');
})



app.listen(port, function(err){
    if (err) {
        console.log("Error:", err);
        return;
    }

    console.log('Server is running on port:', port);
})