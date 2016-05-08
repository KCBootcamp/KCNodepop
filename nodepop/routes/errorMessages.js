/**
 * Created by bhavishchandnani on 8/5/16.
 */
"use strict";

let fs=require('fs');

module.exports =function (lang) {
    let url;
    if(lang==='es') {
        url = __dirname + '/../errors_es.json';
    }else{
        url = __dirname + '/../errors_en.json';
    }
    return JSON.parse(fs.readFileSync(url,'utf-8')).errors;
};