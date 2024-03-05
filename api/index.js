const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
const connectDB = require('./config/db');
const schema = require('./schema/schema');

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  // Set CORS headers for all routes
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    res.status(200).end();
  } else {
    // Continue with the actual request
    next();
  }
});

connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'dev',
}));

app.listen(port, () => console.log(`Server is listening on port:${port}`));
