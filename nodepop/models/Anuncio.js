/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});
let files=require('fs');
anuncioSchema.statics.listPromise = function () {
    return new Promise(function (resolve, reject) {
        let url=__dirname+'/../anuncios.json';
        console.log('URL del archivo', url);
        files.readFile(url,'utf-8',function (err,data) {
            if (err){

                console.log('error al ejecutar la promesa');
                return reject(err);
            }

            console.log('éxito al ejecutar la promesa');
            return resolve(JSON.parse(data));

        })
    })
};

var Anuncio = mongoose.model('Anuncio', anuncioSchema);