const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/products', (req, res) => {
  res.json([
    {
      id: 1001,
      name: 'Erdem Product',
      price:'99.99'
    }
  ])
})



app.listen(4000, ()=>console.log('app is listening on port 4000'))