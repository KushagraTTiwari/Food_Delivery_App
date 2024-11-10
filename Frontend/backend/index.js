const express = require('express')
const app = express();
const db = require('./db');
const Data = require('./model/Data');
require('dotenv').config();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
const Category = require('./model/Category');
app.use(bodyParser.json());// req.body

app.get('/data', async (req, res)=>{
    try {
        const data = await Data.find(); // Fetch all users
        // console.log('Fetched Users: ', data);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching users: ', error);
        return res.status(500).json({ message: 'Error fetching data' });
    }
})
app.get('/category', async (req, res)=>{
    try {
        const data = await Category.find(); // Fetch all users
        // console.log('Fetched Users: ', data);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching users: ', error);
        return res.status(500).json({ message: 'Error fetching data' });
    }
})

const userRoute = require('./routes/userRoute')
const cartRoute = require('./routes/cartRoute')
app.use('/api', userRoute)
app.use('/cart',cartRoute)

app.listen(process.env.PORT, ()=> {
    console.log(`server is listening on port ${process.env.PORT}`)
})