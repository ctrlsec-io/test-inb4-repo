const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the vulnesrasble sExpresss app!');
});

app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`; // Vulnerable SQL query

  // In a real application, you should never construct SQL queries like this
  // This is just for demonstration purposes to create a Semgrep-flagged vulnerability

  // Execute the query and return results...
  res.send(`Searching for: ${searchTerm}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});