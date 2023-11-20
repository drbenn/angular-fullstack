const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const testService = require('./test.js');
const addFunction = require('./test.js').add;
const jwtService = require('./passport-jwt.js');


testService.booyah()
console.log('addFunction result',addFunction(6,19));


//     Authentication Middleware: Implement middleware to protect routes requiring authentication:
// const authMiddleware = jwtService.passport.authenticate('jwt', { session: false });

// app.get('/protected-route', authMiddleware, (req, res) => {
//   // Handle authorized request
// });

// Express setup
const app = express();
app.use(cors());
app.use(express.json());


// Database config
const silverDb = {
  host: "localhost",
  port: 3306,
  user: "super",
  password: "pass",
  database: "project_silver",
}

// Connections
const con = mysql.createConnection(silverDb);

app.get('/', async (req, res) => {
  try {
    console.log('tried /');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ message: 'Docker is easy :whale: 🐳'});
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error');
  }
});

/**
 * Gets all public messages from public_message table
 */
app.get('/public_message', async (req, res) => {
  const sql = 'SELECT * FROM public_message';
  con.query(sql, (err, data) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    err ? res.status(400).json(err) : res.status(201).json(data);
  })
});

/**
 * Gets one public messages by id from public_message table
 */
app.get('/public_message/:id', async (req, res) => {
  const paramId = req.params.id;
  const sql = `SELECT * FROM public_message WHERE id=${paramId}`;
  con.query(sql, (err, data) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    err ? res.status(400).json(err) : res.status(201).json(data);
  })
});

/**
 * Adds 1 public message to public_message table
 */
app.post('/public_message', async (req, res) => {
  const bodyMessage = req.body.message;
  const newViews = Math.floor(Math.random() * 500);
  const sql = `INSERT INTO public_message (message, views) VALUES (\'${bodyMessage}\', \'${newViews}\')`;
  con.query(sql, (err, data) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    err ? res.status(400).json(err) : res.status(201).json(data);
  })
});

/**
 * Updates 1 public message message field in public_message table
 */
app.patch('/public_message/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  const message = req.body.message;
  const sql = 'UPDATE public_message SET message = ? WHERE id = ?';
  con.query(sql, [message, id],  (err, data) => {
    err ? res.status(400).json(err) : res.status(201).json(data);
  })
});

/**
 * Replace 1 public message in public_message table
 */
app.put('/public_message/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  const message = req.body.message;
  const newViews = Math.floor(Math.random() * 1000);
  const sql = 'REPLACE INTO public_message (id, message, views) VALUES (?, ?, ?)';

  con.query(sql, [id, message, newViews],  (err, data) => {
    err ? res.status(400).json(err) : res.status(201).json(data);
  })
});

/**
 * Delete 1 public message in public_message table
 */
app.delete('/public_message/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const id = req.params.id;
  const sql = 'DELETE FROM public_message WHERE id = ?';
  con.query(sql, [id],  (err, data) => {
    err ? res.status(400).json(err) : res.status(201).json(data);
  })
});


/**
 * Verifies if username exists and then registers/inserts new user to database
 */
app.post('/register_user', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const username = req.body.username;
  const password = req.body.password;
  const isUserExisting = await doesUserExist(username);
  if (isUserExisting) {
      res.status(409).json({message: 'username already exists, choose another'})
    } else {
      const isNewUserRegistered = await insertNewUser(username, password);
      console.log('after new user inserted');
      isNewUserRegistered ? res.status(201) : res.status(409).json({message: 'Error inserting to db'});
    }
  }
)
  
// Helper function for app.post('/register_user')
async function doesUserExist(username) {
  const sql = `SELECT (username) FROM users WHERE username='${username}'`;
  const result = await con.promise().query(sql)
    .then( ([row, fields]) => {
      return row && row.length > 0;
    });
  return result;
}

// Helper function for app.post('/register_user')
async function insertNewUser(username, password) {
  console.log('in insert New user');
  const sql = `INSERT INTO users (username, password) VALUES (\ '${username}\', \'${password}\')`;
  const result = await con.promise().query(sql)
    .then( ([row, fields]) => {
      // row will return a header if successful with affectedRows: 1 if successful
      return row.affectedRows > 0 ? true : false;
    });
  return result;
}

/**
 * Verifies if username exists and then registers/inserts new user to database
 */
app.post('/sha_register_user', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const username = req.body.username;
  const password = req.body.password;
  const isUserExisting = await doesUserExist(username);
  if (isUserExisting) {
      res.status(409).json({message: 'username already exists, choose another'})
    } else {
      const isNewUserRegistered = await shaInsertNewUser(username, password);
      console.log('after new user inserted');
      isNewUserRegistered ? res.status(201) : res.status(409).json({message: 'Error inserting to db'});
    }
  }
)
  

// Helper function for app.post('/register_user')
async function shaInsertNewUser(username, password) {
  console.log('in insert New user');
  console.log('password', password);
  const passwordAsArrayBuffer = new TextEncoder().encode(password);
  const shaPassword = crypto.subtle.digest('SHA-256', passwordAsArrayBuffer)
  // .then(function(hash) {
  //   console.log(hash);
  // })
  console.log('crypto-pass', shaPassword);
  const sql = `INSERT INTO users (username, password) VALUES (\ '${username}\', \'${shaPassword}\')`;
  const result = await con.promise().query(sql)
    .then( ([row, fields]) => {
      // row will return a header if successful with affectedRows: 1 if successful
      return row.affectedRows > 0 ? true : false;
    });
  return result;
}

/**
 * Verifies if username exists and then registers/inserts new user to database
 */
app.post('/login_user', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const username = req.body.username;
  const password = req.body.password;
  const loginValidation = await validateLoginCredentials(username, password);
  // const userId = 1; // should get userId from db to add to generate token field
  // todo: if autheticated and additional data for user required, set db query function here
  if (!loginValidation.isLoginValidated) {
      res.status(400).json({message: 'Username/Password incorrect'});
    } else {
      const token = jwtService.generateToken({ userId: loginValidation.userId, username: username});
      console.log(token);
      res.status(201).json({message: 'Login Successful'});
    }
  }
)

// Helper function for app.post('/loginuser')
async function validateLoginCredentials(username, password) {
  const sql = `SELECT * FROM users WHERE username= ? AND password= ?`;
  const result = await con.promise().query(sql, [username, password])
    .then( ([row, fields]) => {
      console.log(row);
      console.log(fields);
      const isLoginValidated = row && row.length === 1;
      const userId = 0; // todo: once userId is column in table, should be row.id
      return { userId: userId, isLoginValidated: isLoginValidated}
    });
  return result;
}



const port = process.env.port || 8080;
app.listen(port, () => console.log(`app listening on port ${port}`));