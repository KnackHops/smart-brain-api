const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const register = require('./controllers/register.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'himalosc',
    database : 'smart-brain'
  }
});



const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());

const port = 3000;

app.get('/', (req, res)=>{res.json(dbase.user)})

app.post('/signin', signin.signinHandler(db,bcrypt));

app.get('/profile/:id', profile.profileHandler(db));

app.post('/register', register.registerHandler(db, bcrypt));

app.put('/image', image.imageHandler(db));

app.post('/imageapi', image.imageApiHandler);



app.listen(port, ()=>{
    console.log(`app is runnin in ${port}`)
})