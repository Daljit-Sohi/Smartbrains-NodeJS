//Importing Local Packages
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const imageEntries = require('./Controllers/imageEntries');
const profile = require('./Controllers/profile');

//Importing NPM Packages
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const db = knex({ //Connecting to our Postgres Database
 client: 'pg', 
 connection: {
     host: 'localhost', 
     user: 'postgres', 
     password: 'super',
     database: 'smartbrain'
 }
});

/** 
db.select('*').from('users').then(data => {
    console.log(data);
})
*/

const app = express();

//Middleware to Parse incoming/outgoing Data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));
app.use(cors());

/** 
const database = {
    users: [
        {
            id: '123', 
            name: 'John', 
            email: 'john@gmail.com', 
            password: 'cookies', 
            entries: 0, 
            joined: new Date()
        }, 
        {
            id: '124', 
            name: 'Sally', 
            email: 'sally@gmail.com', 
            password: 'bananas', 
            entries: 0, 
            joined: new Date()
        }
    ], //end users
    
    login: [
        {
            id: '987', 
            has: '', 
            email: 'john@gmail.com'
        }
    ] //end login
} //end const -> database
*/

/** 
//Route Function
app.get('/', (req, res)=>{
    res.send(database.users);
});
*/

//Sign In Route
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

//Register Route
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} );

//Profile Route
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

//Entries Route
app.put('/image', (req, res) => imageEntries.handleImage(req, res, db));

//Handle API Call
app.post('/imageurl', (req, res) => imageEntries.handleApiCall(req, res));

/** 
        //Environmental Variables
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}....`);
        });

        //on the Bash Terminal --> PORT=3000 node server.js`
*/


app.listen(3001, () =>{
    console.log('running on port 3001.........');
});


/**
 * End Points
 * 
 *  /                   --> res (This is working)
 *  /signin             --> POST => success/fail
 *  /register           --> POST => user
 *  /profile/:userId    --> GET = user
 *  /image              --> PUT
 * 
 */