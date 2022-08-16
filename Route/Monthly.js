const express = require('express');

const {readMonthly,addItem,editItem,deleteItem} = require('./../Controllers/Monthly.js');
const route =  express.Router();

route.post('/addItem',addItem); //done
route.post('/deleteItem',deleteItem); //done
route.post('/editItem',editItem); //done
route.post('/readMonthly',readMonthly); //done

module.exports = route