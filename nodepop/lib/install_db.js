/**
 * Created by bhavishchandnani on 4/5/16.
 */
"use strict";
//Conexion con base de datos con mongoose
var mongooose = require('mongoose');
var con = mongooose.connection;

con.on('error', console.log.bind(console, 'DB connection error'));

con.once('open', install);

mongooose.connect('mongodb://localhost:27017/practicanode');



//Instalación de la BBDD (adquirir datos de fichero json para incluirlo a la bbdd)
function install(){
    console.log.bind(console, 'Connected to mongo DB');
};