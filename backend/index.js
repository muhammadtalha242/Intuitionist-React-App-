const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const inputForm = require('./routes/input')
const COD = require('./routes/COD')
const login = require('./routes/login')
const database = require('./routes/data')
var bodyParser = require('body-parser')

const db = require('./config');
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
app.use('/', inputForm.router);
app.use('/submit', COD)
app.use('/', login)
app.use('/data', database)

app.listen(4000, () => {
	console.log("Products listening")
});