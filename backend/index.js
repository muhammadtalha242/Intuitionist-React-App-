const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const inputForm = require('./routes/CPP&EPP/input')
const ComputationModules = require('./routes/CPP&EPP/ComputationModules')
const login = require('./routes/RegistrationLoginModule/login')
const database = require('./routes/DataBaseModule/data')
const updateDatabase = require('./routes/DataBaseModule/updateTable')
var bodyParser = require('body-parser')

const db = require('./routes/DataBaseModule/config');
db.authenticate()
	.then(() => console.log('db connected'))
	.catch(err => console.log('error connecting'))


app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded(
		{ extended: false }
	)
)
// app.use('/', inputForm.router);
app.use('/submit', ComputationModules)
app.use('/', login)
app.use('/data', database)
app.use('/update', updateDatabase)


app.listen(4000, () => {
	console.log("Products listening")
});