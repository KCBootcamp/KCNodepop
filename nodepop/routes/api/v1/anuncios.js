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

router.get('/filtrados?tag1=:tag1?&tag2=:tag2?&tag3=:tag3?&tag4=:tag4?&venta=:venta?&precio=:precio?&nombre=:nombre?' +
    '&start=:start?&limit=:limit?&sort=:sort?&includeTotal=:includeTotal&token=:token'
    , function (req,res) {
    Anuncio.filtrarAnuncios(req.params)
        .then(function(data){
            if(data.length===0){
                data='0 results';
            }
            if (req.params.includeTotal==='true'){
                return res.json({success:true, rows:data, total:data.length});
            }
            return res.json({success:true, rows:data});
        })
        .catch(function(err){
            console.log('ERROR', err);
            return res.json({success:false, rows:err});
        });
});

module.exports = router;