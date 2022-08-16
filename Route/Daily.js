const express = require('express');
const {AddDaily,DeleteDaily,EditDaily,readDaily} = require('./../Controllers/Daily.js');

const route = express.Router();

route.post('/addDaily',AddDaily) //done
route.post('/deleteDaily',DeleteDaily) //done
route.post('/editDaily',EditDaily) //done
route.get('/readDaily',readDaily) //done

module.exports = route;