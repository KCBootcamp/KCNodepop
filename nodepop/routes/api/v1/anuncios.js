/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');

router.get('/', function (req,res) {
    Anuncio.listPromise().then(function (anuncios) {
        return res.json({success:true, rows:anuncios});
    }).catch(function (err) {
        return res.json({success:false, rows:err});
    });
});
let fs = require('fs');
    router.get('/images/:image', function (req, res){
        let ruta=req.params.image;
        console.log('RUTA',ruta);
        var options = {
            root: __dirname+'/../../../public/images/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        res.sendFile(ruta, options,function (err) {
            if (err){
                console.log(err);
                res.status(err.status);
                return ;
            }
            console.log('Sent:', req.params.image);
        });
    });



module.exports = router;