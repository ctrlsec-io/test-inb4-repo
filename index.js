const express = require('express');
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken")

const generate_session = async () => {
    const session_token = jwt.sign({ id: 1, client_id: 2 }, "secretValue", {
        expiresIn: "24h"
    })
    return session_token
}

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the vulnesrasble sExpresss app!');
});

app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`; // Vulnerable SQL query
  const session = generate_session()
  console.log(session)
  const secret_value = "password123"
  // In a real application, you should never construct SQL queries like this
  // This is just for demonstration purposes to create a Semgrep-flagged vulnerability

  // Execute the query and return results...
  res.send(`Searching for: ${searchTerm}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});