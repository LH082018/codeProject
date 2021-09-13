const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const knex = require('knex')

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'LmH80',
      password : '',
      database : 'register_db'
    }
  });

knex.select('*').from('users').then(data=>{
    console.log(data)
});

// points to the public folder for static files
app.use(express.static('public'));

// if post request comes in html form or json
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// get request to the root url which points to the index.html page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

// get request to the profile - localhost:3002/profile
// app.get('/profile',(req,res)=>{
//     // here you can point to another page, presently loading a string
//     res.send("loading profile");
// })


app.post('/', (req, res) => {
	const first = req.params.first;
  	const last = req.params.last;
  	const email = req.params.email;
  	const text = req.params.text;
    db('users').insert({
        f_name: first,
        l_name:last,
        email:email,
        joined: new Date()
    }).then(console.log)
});
// localhost:3001 in browser (3001 is the port selected)
app.listen(3001);

/*
/signin --> POST = success/fail
/ register --> POST = user
/profile/userid -- > GET = user
/image --> PUT --> user
*/
