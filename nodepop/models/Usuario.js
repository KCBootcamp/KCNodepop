/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

let mongoose = require('mongoose');

let usuarioSchema = mongoose.Schema({
    nombre: String
});

usuarioSchema.statics.deleteAll = function() {
    return new Promise (function(resolve,reject){
        Usuario.remove({}, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });

    });
};

let Usuario =mongoose.model('Usuario',usuarioSchema);