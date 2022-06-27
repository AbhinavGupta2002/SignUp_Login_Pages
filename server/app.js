const express = require('express');
const mongoose = require('mongoose');
const Account = require('./schema');

var app = express();

var cors = require('cors');

app.use(cors());

var bodyParser = require('body-parser')

app.use(bodyParser.json());

// Connect to MongoDB
const dbURL = 'mongodb+srv://a363gupt:abhinav-gupta@accounts.kc1nvv3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({extended : true}));

// Add a document to database
// STRUCTURE OF OBJECT REQ:
// {
//      username - String
//      email - String
//      password - String
// }
app.post('/add-account', async (req, res) => {
    try {
        //const accounts = await Account.find();
        const account = new Account(req.body);
        await account.save();
    } catch (err) {
        err.statusCode = 400; // adding document to database was unsuccessful
        console.log(err)
        throw(err);
    }
});

// Retrieve all account usernames from database
app.get('/all-usernames', async (req, res) => {
    try {
        const accounts = await Account.find({}, {username:1, _id:0});
        res.send(accounts);
    } catch (err) {
        err.statusCode = 400; // retrieving all tasks of a document from database was unsuccessful
        throw(err);
    }
});

// Retrieve all account usernames and passwords from database
app.get('/all-login-credentials', async (req, res) => {
    try {
        const accounts = await Account.find({}, {username:1, password:1, _id:0});
        res.send(accounts);
    } catch (err) {
        err.statusCode = 400; // retrieving all tasks of a document from database was unsuccessful
        throw(err);
    }
});