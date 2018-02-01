let express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
let app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/jwt',{useMongoClient : true}, () => {
    console.log('connected to mongoose');
})

app.use(morgan('combined'));
app.use(bodyParser.json({type : '*/*'}));
app.use(cors());

app.use('/',router);




app.listen(3000,()=>{
    console.log('listening on 3000')
})