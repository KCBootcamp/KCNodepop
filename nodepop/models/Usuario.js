/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

let mongoose = require('mongoose');

let usuarioSchema = mongoose.Schema({
    nombre: {type: String, required:true},
    email: {type: String, required:true},
    clave: {type: String, required:true}
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

usuarioSchema.index({email:1});
let Usuario =mongoose.model('Usuario',usuarioSchema);