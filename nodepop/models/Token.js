/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

let mongoose = require('mongoose');

let tokenSchema = mongoose.Schema({
    token: String
});

tokenSchema.statics.deleteAll = function() {
    return new Promise (function(resolve,reject){
        Token.remove({}, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });

    });
};

let Token = mongoose.model('Token',tokenSchema);