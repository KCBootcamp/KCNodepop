/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

let mongoose = require('mongoose');

let anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.listPromise = function () {
    return new Promise(function (resolve, reject) {
        Anuncio.find(function (err, anuncios) {
            if (err) {
                return reject(err);
            }
            return resolve(anuncios);
        });
        });
        
        
    
};

anuncioSchema.statics.deleteAll = function() { 
    return new Promise (function(resolve,reject){
        Anuncio.remove({}, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });

    });
    
};

let Anuncio = mongoose.model('Anuncio', anuncioSchema);