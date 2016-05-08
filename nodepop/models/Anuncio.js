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

anuncioSchema.statics.listarTags=function () {
    return new Promise(function (res,rej) {
        let tags=['lifestyle', 'work', 'motor', 'mobile'];
        return res(tags);
    })
};

anuncioSchema.statics.filtrarAnuncios=function(params){
    return new Promise(function (res,rej) {
        let query;
        if (params.includeTotal===true){
            query= Anuncio.find({})
        }else{
            query = Anuncio.find({});
        }
        
        query= addBooleanCondition(query,{venta:params.venta},params.venta);
        query= addCondition(query,{tags:params.tag1},params.tag1);
        query= addCondition(query,{tags:params.tag2},params.tag2);
        query= addCondition(query,{tags:params.tag3},params.tag3);
        query= addCondition(query,{tags:params.tag4},params.tag4);
        query= addPriceRangeCondition(query,params.precio);
        query=addNameCondition(query,params.nombre);
        query.skip(parseInt(params.start));
        query.limit(parseInt(params.limit));
        query.sort(params.sort);
        return query.exec(function(err, rows) {
            if (err) {
                return rej(err);
            }
            return res(rows);
        });
    });



};

function addBooleanCondition(query,obj, value){
    if (value){
        if(!(value.match('true|false'))){
            return;
        }
        return query.where(obj);
    }
    return query;
}

function addCondition(query,obj, value){
    if (value){
        return query.where(obj);
    }
    return query;
}

function addPriceRangeCondition(query, value){
    if (value){
        let obj;
        let pos =value.indexOf('-');
        if(pos===-1){
            console.log('igual');
            obj={precio:value};
        }else if(pos===0){
            console.log('menor',value.substr(1,value.length-1));
            obj={precio:{'$lte':value.substr(1,value.length-1)}};
        }else if(pos===(value.length-1)){
            console.log('mayor',value.substr(0,value.length-1),value.substr(value.length-1));
            obj={precio:{'$gte':value.substr(0,value.length-1)}};
        }else{
            console.log('entre',value.substr(0,pos),'y',value.substr(pos+1,value.length-1));
            obj={precio:{'$gte':value.substr(0,pos), '$lte':value.substr(pos+1,value.length-1)}}
        }

        return query.where(obj);
    }
    return query;
}

function addNameCondition(query,value){
    if (value){
        return query.where({nombre: new RegExp('^'+value,"i")});
    }
    return query;
}

anuncioSchema.index({nombre:1, precio:1});
let Anuncio = mongoose.model('Anuncio', anuncioSchema);