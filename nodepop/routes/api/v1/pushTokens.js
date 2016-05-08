/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Token = mongoose.model('Token');

//Auth
let jwtAuth = require('../../../lib/jwtAuth');
router.use(jwtAuth());

router.get('/', function (req,res) {
    Token.listTokens().then(function (tokens) {
        return res.json({success:true, rows:tokens});
    }).catch(function (err) {
        return res.json({success:false, rows:err});
    });
});

module.exports = router;