const express = require('express')
const app =express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sikjemj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    //   await client.connect();
         const taskCollection=client.db('TaskTracker').collection('AllTask')

         app.post('/addTask', async(req,res)=>{
             try{
                 const taskInfo=req.body
                 const result=await taskCollection.insertOne(taskInfo)
                 return res.send(result)
             }
             catch{
                return res.send({error:true})
             }
         })

         app.get('/allTask',async(req,res)=>{
             try{
                 const result= await taskCollection.find().toArray()
                 return res.send(result)
             }
             catch{
                return res.send({error:true})
             }
         })












      // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req,res)=>{
     res.send('task server is running')
})

app.listen(port,()=>{
      console.log(`task Server is running on port ${port}`)
})