/**
 * Created by bhavishchandnani on 26/4/16.
 */
'use strict';
/**
 * Your utility library for express
 */
var jwt = require('jsonwebtoken');
var configJWT = require('../local_config').jwt;
var errMes=require('./../routes/errorMessages');
var er=errMes('en');
/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */
module.exports = function() {
    return function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'] ||req.params.token;
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, configJWT.secret, function(err, decoded) {
                if (err) {
                    return res.json({ ok: false, error: {code: 401, message: er.tokenauth}});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token return error
            return res.status(403).json({
                ok: false,
                error: { code: 403, message: er.missingtoken}
            });
        }
    };
};