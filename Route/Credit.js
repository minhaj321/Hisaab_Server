const express = require('express');
const {readCredit,addCredit,deleteCredit} = require("./../Controllers/Credit.js");

var route = express.Router();

route.post('/addCredit',addCredit); //done
route.post('/readCredit',readCredit);//done
route.get('/deleteCredit',deleteCredit);//done


module.exports = route