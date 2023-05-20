const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;
const teams = require('./Teams.json');
const products = require('./Data/Products.json');
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.SECRET_NAME}:${process.env.SECRET_PASS}@cluster0.nyrjtse.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/teams', (req, res) => {
  res.send(teams);
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// supto622
// 9bBpSuRbDfUx3ufy