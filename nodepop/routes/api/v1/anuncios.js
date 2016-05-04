/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

router.get('/', function (req,res) {
    Anuncio.listPromise().then(function (data) {
        return res.json({success:true, rows:data});
    }).catch(function (err) {
        return res.json({success:false, rows:err});
    });
});

module.exports = router;