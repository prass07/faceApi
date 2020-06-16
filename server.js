const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'prass',
    password : '0327',
    database : 'smart_brain'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'jhon',
			email: 'jhon@gmail.com',
			password: '12345',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'sally',
			email: 'sally@gmail.com',
			password: 'abcd',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/',(req,res) => {
	res.json(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfile (req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000,() => {
	console.log('app is running on port 3000');
})

/* 

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/