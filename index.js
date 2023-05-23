const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.port || 5000;

//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.TH_USER}:${process.env.TH_PASS}@cluster0.watftgx.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const hourseToyesCollection = client.db("toyesHouse").collection("houresToyes");
    const catsToyesCollection = client.db("toyesHouse").collection("toyes");
    const taddyCollection = client.db("toyesHouse").collection("tadyBear");
    const allCollection = client.db("toyesHouse").collection("allToyes");
    const customarReview = client.db("toyesHouse").collection("review");
    const addedProduct = client.db("toyesHouse").collection("adding");

    app.get('/horses',async(req,res)=>{
      const result = await hourseToyesCollection.find().toArray()
      res.send(result)
    })

    
    app.get('/horses/:id',async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await hourseToyesCollection.findOne(query)
      res.send(result)
    })
    
    app.get('/cats',async(req,res)=>{
      const result = await catsToyesCollection.find().toArray()
      res.send(result)
    })
    
    app.get('/cats/:id',async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await catsToyesCollection.findOne(query)
      res.send(result)
    })
    
    app.get('/tadyBear',async(req,res)=>{
      const result = await taddyCollection.find().toArray()
      res.send(result)
    })
    
    app.get('/tadyBear/:id',async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await taddyCollection.findOne(query)
      res.send(result)
    })
    
   
    app.get('/allToyes',async(req,res)=>{
      const result = await allCollection.find().toArray()
      res.send(result)
    })

    app.get('/allToyes/:id',async(req,res)=>{
      const id = req.params.id;
      const quary = {_id:new ObjectId(id)}
      const result = await allCollection.findOne(quary)
      res.send(result)
    })

    app.get('/review',async(req,res)=>{
      const result = await customarReview.find().toArray()
      res.send(result)
    })

     app.post('/adding',async(req,res)=>{
       const adding = req.body;
       console.log(adding)

       const result = await addedProduct.insertOne(adding)
       res.send(result)
    }) 

    app.get('/adding',async(req,res)=>{
      console.log(req.query.email)
      let query = {}

      if(req.query?.email){
        query = { email:req.query?.email }
      }

      const result = await addedProduct.find(query).toArray()
      res.send(result)
    })

    app.patch('/adding/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = {_id:new ObjectId(id)}
      const updating = req.body;
      console.log(updating)

      const updateDoc = {
        $set: {
          status: updating.status
        },
      };
    })

    app.delete('/adding/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await addedProduct.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    console.log('All animal toyes are here')
    res.send('All toyes are here')
})

app.listen(port,()=>{
    console.log(`port in running on ${port}`)
})