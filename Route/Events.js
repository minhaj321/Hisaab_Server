const express = require('express');
const {addEvent,deleteEvent,readEvent} = require('./../Controllers/Events.js');

const route = express.Router();

route.post('/addEvent',addEvent) //done
route.post('/deleteEvent',deleteEvent) //done
route.post('/readEvent',readEvent) //done

module.exports = route;