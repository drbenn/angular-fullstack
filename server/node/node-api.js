const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const silverDb = {
  host: "localhost",
  port: 3306,
  user: "super",
  password: "pass",
  database: "project_silver",
}

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
  console.log(req.body);
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
  
// Helper function for app.post('/registeruser')
async function doesUserExist(username) {
  const sql = `SELECT (username) FROM users WHERE username='${username}'`;
  const result = await con.promise().query(sql)
    .then( ([row, fields]) => {
      return row && row.length > 0;
    });
  return result;
}

// Helper function for app.post('/registeruser')
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
app.post('/loginuser', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const username = req.body.username;
  const password = req.body.password;
  const isLoginAuthenticated = await authenticateLogin(username, password);
  // todo: if autheticated and additional data for user required, set db query function here
  if (!isLoginAuthenticated) {
      res.status(400).json({message: 'Username/Password incorrect'});
    } else {
      res.status(201).json({message: 'Login Successful'});
    }
  }
)

// Helper function for app.post('/loginuser')
async function authenticateLogin(username, password) {
  const sql = `SELECT * FROM users WHERE username= ? AND password= ?`;
  const result = await con.promise().query(sql, [username, password])
    .then( ([row, fields]) => {
      return row && row.length === 1;
    });
  return result;
}

// PUT is used to replace an entire record, while PATCH is used to partially replace/update 1+ fields in record

//       const insert_user_query = `INSERT INTO grizzly_users (username, email, password, join_date) VALUES (\'${submitted_username}\', \'${submitted_email}\', \'${submitted_password}\', \'${date}\')`;
//       db.query(insert_user_query, (err, data2) => {
//         if (data.length > 0) {
//           return res.status(400).json({ error: 'Username or email is already taken' });
//         }
//         else {
//           return res.status(201).json({ message: 'Registration added successfully' });
//         }

// app.get('/grizzly-api/searchtickers', async (req, res) => {
//   const sql = `SELECT ticker, name from grizzly_stocks WHERE industry IS NOT NULL AND dividend_yield IS NOT NULL AND years_dividend_growth IS NOT NULL AND three_year_cagr IS NOT NULL  AND five_year_cagr IS NOT NULL AND annual_dividends IS NOT NULL AND CHAR_LENGTH(payout_ratios) > 5`;
//   db.query(sql, (err, data) => {
//     err ? res.json("Error retrieving ticker listing") : res.json(data);
//   })
// });

// grizzly_users_db_schema = {
//   "username": 0,
//   "email": 1,
//   "password": 2,
//   "join_date": 3
// }

// data_schema = {
//  "ticker": 0,
//  "name": 1,
//  "type": 2,
//  "industry": 3,
//  "website": 4,
//  "logo": 5,
//  "dividend_yield": 6,
//  "years_dividend_growth": 7, 
//  "growth_all_years_of_history": 8, 
//  "payout_ratios": 9,
//  "three_year_cagr": 10, 
//  "five_year_cagr": 11, 
//  "year_price_high": 12,
//  "year_price_low": 13,
//  "beta": 14,
//  "backup_stock_price": 15,
//  "backup_stock_price_date_saved": 16,
//  "dividend_payment_months_and_count": 17,
//  "annual_dividend": 18
// }

// app.get('/grizzly-api/test', async (req, res) => {
//   try {
//     res.send(`Hello, World! The current time is: ${new Date()}`);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).send('Error');
//   }
// });


// app.get('/grizzly-api/dbtest', async (req, res) => {
//   const sql = `SELECT name FROM grizzly_stocks where ticker="LAND"`;
//   db.query(sql, (err, data) => {
//     if (err) return res.json(`ERROR: ${err}`);
//     return res.json(data);
//   })
// })


// function http_query_to_db_query_tickers(tickers) {
//   if (tickers.length > 1) {
//     let db_query = '';
//     for (let i = 0; i < tickers.length; i++) {
//       i === 0 ? db_query += `ticker = '${tickers[i]}'` : db_query += ` OR ticker = '${tickers[i]}'`;
//     }
//     return db_query;
//   }
//   else {
//     return `ticker = '${tickers[0]}'`;
//   }
// }


// app.post('/grizzly-api/dataquery', async (req, res) => {
//   const tickers_submitted = req.body;
//   const tickers_query = http_query_to_db_query_tickers(tickers_submitted)
//   const sql = `SELECT ticker, name, equity_type, industry, website, logo, dividend_yield, years_dividend_growth, growth_all_years_of_history, payout_ratios, three_year_cagr, five_year_cagr, year_price_high, year_price_low, beta, backup_stock_price, backup_stock_price_date_saved, dividend_payment_months_and_count, annual_dividends from grizzly_stocks WHERE ${tickers_query} AND CHAR_LENGTH(payout_ratios) > 5`;
//   db.query(sql, (err, data) => {
//     err ? res.status(400).json({ error: 'Stock Retrieval Failed, try again'}) : res.status(201).json({data: JSON.stringify(data)});
//   })
// });


// app.post('/grizzly-api/login', async (req, res) => {
//   const user_data = req.body;
//   const submitted_username = user_data["username"];
//   const submitted_password = user_data["password"];
//   const login_query = `SELECT * from grizzly_users WHERE username = ? AND password = ?`;
//   const login_params = [submitted_username, submitted_password];
//   db.query(login_query, login_params, (err, data) => {
//     if (err) {
//       return res.status(400).json({ error: 'Login Failed, try again'});
//     } else {
//       // console.log(data);
//       const success_msg = 'User login successful';
//       const failed_msg = 'Username or password incorrect';
//       data.length === 1 ? res.status(201).json({ message: success_msg }) : res.status(400).json({ error: failed_msg});
//     }
//   })
// });


// app.post('/grizzly-api/register', async (req, res) => {
//   const user_data = req.body;
//   const submitted_username = user_data["username"];
//   const submitted_email = user_data["email"];
//   const submitted_password = user_data["password"];
//   const existing_query = `SELECT * from grizzly_users WHERE username = ? OR email = ?`;
//   const existing_params = [submitted_username, submitted_email];
//   db.query(existing_query, existing_params, (err, data) => {
//     if (err) {
//       return res.status(400).json({ error: 'Username or email is already taken' });
//     }
//     else {
//       const insert_user_query = `INSERT INTO grizzly_users (username, email, password, join_date) VALUES (\'${submitted_username}\', \'${submitted_email}\', \'${submitted_password}\', \'${date}\')`;
//       db.query(insert_user_query, (err, data2) => {
//         if (data.length > 0) {
//           return res.status(400).json({ error: 'Username or email is already taken' });
//         }
//         else {
//           return res.status(201).json({ message: 'Registration added successfully' });
//         }
//     })
//   }})
// });


// app.get('/grizzly-api/searchtickers', async (req, res) => {
//   const sql = `SELECT ticker, name from grizzly_stocks WHERE industry IS NOT NULL AND dividend_yield IS NOT NULL AND years_dividend_growth IS NOT NULL AND three_year_cagr IS NOT NULL  AND five_year_cagr IS NOT NULL AND annual_dividends IS NOT NULL AND CHAR_LENGTH(payout_ratios) > 5`;
//   db.query(sql, (err, data) => {
//     err ? res.json("Error retrieving ticker listing") : res.json(data);
//   })
// });



const port = process.env.port || 8080;
app.listen(port, () => console.log(`app listening on port ${port}`));