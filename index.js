const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;
const teams=require('./Teams.json');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.SECRET_NAME}:${process.env.SECRET_PASS}@cluster0.nyrjtse.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    

    const productCollection = client.db('productDB').collection('products');

    app.post('/products',async(req,res)=>{
        const newProducts = req.body;
        const result = await productCollection.insertOne(newProducts);
        res.send(result);
    })


    app.get('/products', async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/products/:productId', async (req, res) => {
        const { productId } = req.params;
        const product = await productCollection.findOne({ _id: new ObjectId(productId) });
      
        if (!product) {
          res.status(404).json({ error: 'Product not found' });
        } else {
          res.json(product);
        }
      });
      
      app.get('/teams', (req, res) => {
        res.send(teams);
      });


    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
