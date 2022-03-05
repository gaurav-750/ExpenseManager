const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/expenses_db');

const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function(){
    console.log('Successfully connected to the expenses DB!');
})