/**
 * Created by bhavishchandnani on 3/5/16.
 */
"use strict";

var jwt =require('jsonwebtoken');
var config = require('../../../local_config')
var express =require('express');
var router = express.Router();

var Usuario =require('mongoose').model('Usuario');


router.post('/authenticate', function (req,res) {
    var user=req.body.user;
    var mail=req.body.mail;
    var pass=req.body.pass;

    Usuario.findOne({nombre: user}).exec(function (err,user) {
        if(err){
            return res.status(500).json({success: false, error: err});
        }

        if(!user){
            return res.status(401).json({success: false, error: "Auth failed, user not found."});
        }

        if(!mail){
            return res.status(401).json({success: false, error: "Auth failed, email not found."});
        }

        if(user.clave !== pass){
            return res.status(401).json({success: false, error: "Invalid password"});
        }
        var token = jwt.sign({id: user._id}, config.jwt.secret, {expiresIn:60 * 60 * 24 * 2});

        res.json({success: true, token: token});
    })
});

router.post('/register', function (req,res) {


    let usuario = new Usuario({nombre: req.body.user, clave: req.body.pass, email: req.body.mail});
    let errores = usuario.validateSync();
    if(errores && errores.length!==0){
        res.status(401).json({success: false, error: 'Usuario incorrecto compruebe todos los campos'});
    }
        Usuario.findOne({nombre: req.body.user}).exec(function (err,user) {
            if (err) {
                return res.status(500).json({success: false, error: err});
            }
            if (user){
                return res.json({success: false, error: "Ya hay un usuario registrado con este nombre"});
            }
            Usuario.findOne({email: req.body.mail}).exec(function (err,user) {
                if (err) {
                    return res.status(500).json({success: false, error: err});
                }
                if (user){
                    return res.json({success: false, error: "Ya hay un usuario registrado con este email"});
                }

               
                usuario.save(function (err, userCreated) {
                    if (err) {
                        console.log('Error', err, 'al guardar usuario: ', usuario);
                        return res.json({success: false, error: "Error al guardar usuario"});

                    }

                    console.log('Usuario', userCreated);
                    res.json({success: true, usuario: 'usuario creado: ' + userCreated.nombre});
                    
                });
            });
        });
    
});

module.exports =router;