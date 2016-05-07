/**
 * Created by bhavishchandnani on 5/5/16.
 */
"use strict";
//Conexion con base de datos con mongoose
var mongooose = require('mongoose');
var con = mongooose.connection;

con.on('error', console.log.bind(console, 'DB connection error'));

con.once('open', console.log.bind(console, 'Connected to mongo DB'));

mongooose.connect('mongodb://localhost:27017/nodepopdb');