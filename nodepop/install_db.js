/**
 * Created by bhavishchandnani on 4/5/16.
 */
"use strict";
require('./models/Anuncio');
require('./models/Usuario');
require('./models/Token');
//Conexion con base de datos con mongoose
let mongoose = require('mongoose');
let con = mongoose.connection;

con.on('error', console.log.bind(console, 'DB connection error'));

con.once('open', console.log.bind(console, 'Connected to mongo DB'));

mongoose.connect('mongodb://localhost:27017/nodepopdb');

mongoose.connection.on('open', callback);

function callback() {
    let Anuncio = mongoose.model('Anuncio');
    let Usuario = mongoose.model('Usuario');
    let Token = mongoose.model('Token');

    Anuncio.deleteAll()
        .then( function(){
            console.log('Tabla anuncios -registros eliminados');
            Usuario.deleteAll()
                .then(function () {
                    console.log('Tabla usuarios - registros eliminados');
                })
        })
        .then(Token.deleteAll().then(function () {
            console.log('Tabla tokens - registros eliminados');
        }))
        .then(getJSON()
            .then(function (data) {
                console.log('Cargando anuncios', data.anuncios.length);
                loadCollectionAnuncio(data.anuncios)
                    .then(function () {
                        console.log('Guardando anuncios');
                    })
                    .catch(function (err) {
                        console.log('Error al guardar los anuncios', err);
                        return closeDB();
                    });
            })
            .catch(function () {
                console.log('Error al cargar el JSON de los anuncios', err);
                return closeDB();
                })
        )
        .catch(function (err) {
            console.log('Error al eliminar registros en la tabla', err);
            return closeDB();
        });
}
function closeDB() {
    console.log('BBDD CERRADA');
    mongoose.disconnect();
}

//Carga de datos del Json
function getJSON(){
    let files=require('fs');
    return new Promise(function (resolve, reject) {
        let url=__dirname+'/anuncios.json';
        console.log('URL del archivo', url);
        files.readFile(url,'utf-8',function (err,data) {
            if (err){
                console.log('error al ejecutar la promesa');
                return reject(err);
            }
            console.log('éxito al ejecutar la promesa');
            return resolve(JSON.parse(data));
        });
    });
}

//Guardar datos en tabla Anuncios 
function loadCollectionAnuncio(collection) {
    return new Promise(function (resolve,reject) {
        let Anuncio = mongoose.model('Anuncio');
        
        console.log('Longitud', collection.length);

        for (let i = 0; i < collection.length; i++) {
            
            let element = new Anuncio(collection[i]);
           

            element.save(function (err, elementCreated) {
                if (err) {
                    console.log('Error', err, 'al guardar el elemento: ', element);
                    return reject(err);
                }
                console.log('Guardado elemento', elementCreated);
                if (i===(collection.length-1)){
                    loadDefaultUser(err,function () {
                        
                    });
                }
            });
        }
        return resolve();
    });
}

function loadDefaultUser(err) {
    let Usuario = mongoose.model('Usuario');
    let usuario =new Usuario({nombre:'invitado', clave:'1234', email:'invitado@email.com'});
    if(err){
        throw err;
        return;
    } 
    usuario.save(function (err, userCreated) {
        if (err) {
            console.log('Error', err, 'al guardar usuario: ', usuario);
            throw err;
            return;
        }
        console.log('Usuario', userCreated);
        closeDB();
    });
    
}