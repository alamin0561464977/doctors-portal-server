const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('App Running');
});



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.blopt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const appointmentOptionsCollection = client.db("doctorsPortal").collection("appointmentOption");

        app.get('/appointmentOption', async (req, res) => {
            const filter = {};
            const appointmentOption = await appointmentOptionsCollection.find(filter).toArray();
            console.log(appointmentOption);
            res.send(appointmentOption);
        })

    }
    finally { }
};
run().catch(err => console.log(err));



app.listen(port, () => {
    console.log('App Running', port);
});