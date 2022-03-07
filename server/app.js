require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/image/uploads',express.static(path.join(__dirname,'/image/uploads')));

const route = require('./routes');
app.use(route)

app.listen(port, () =>{
    console.log(`app listening on port: ${port}`)
})
