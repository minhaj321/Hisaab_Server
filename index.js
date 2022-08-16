const express = require("express");
const cors = require("cors");
const app = express();
const connection = require('./Connection/db');
app.use(express.json());
app.use(cors())

connection()

app.use('/user',require('./Route/User.js')) //done
app.use('/credit',require('./Route/Credit')) //done
app.use('/event',require('./Route/Events')) //done
app.use('/daily',require('./Route/Daily.js')) //done
app.use('/monthly',require('./Route/Monthly.js')) //done



app.listen(3000,()=>{
    console.log('server is runnig on ',3000)
})
