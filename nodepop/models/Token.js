/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

var mongoose = require('mongoose');

let pushTokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    usuario: String
});

pushTokenSchema.statics.deleteAll = function() {
    return new Promise (function(resolve,reject){
        Token.remove({}, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });

    });
};

pushTokenSchema.statics.listTokens = function () {
    return new Promise(function (resolve, reject) {
        Token.find(function (err, tokens) {
            if (err) {
                return reject(err);
            }
            return resolve(tokens);
        });
    });
};


let Token = mongoose.model('Token',pushTokenSchema);