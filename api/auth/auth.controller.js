const jwt = require('jsonwebtoken');
const app_config = require('../../config/app_config')
const compose = require('composable-middleware');
const userService = require('../user/user.service')
const redis = require('../redis/redis_controller')
exports.login = (req, res, next) => {
    req.checkBody("email", "email missing").notEmpty()
    req.checkBody("password", "password missing").notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({
            success: false,
            data: errors[0].msg
        })
    } else {
        userService.login(req.body).then((user) => {
            let userJson = user.toJSON();
            userJson['token'] = generateJwt(user.id)
            res.send({
                success: true,
                data: userJson
            })
        }).catch((err) => {
            res.status(403).send({
                success: false,
                data: "User Not Found please Register"
            })
        })
    }

};
exports.register = (req, res, next) => {
    req.checkBody("name", "name missing").notEmpty()
    req.checkBody("email", "email missing").notEmpty()
    req.checkBody("password", "password missing").notEmpty()
    // req.checkBody("img", "img missing").notEmpty()
    // req.checkBody("imgThumb", "imgThumb missing").notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({
            success: false,
            data: errors[0].msg
        })
    } else {

        userService.register(req.body).then((user) => {
            user['token'] = generateJwt(user.id)
            res.send({
                success: true,
                data: user
            })
        }).catch((err) => {
            console.log(err)
            res.status(400).send({
                success: false,
                data: err['errors'][0]['message']
            })

        })
    }

};

exports.check_email = (req, res, next) => {
    req.checkBody("email", "Email Not available").isEmail()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({
            success: false,
            data: errors[0].msg
        })
    } else {
        userService.checkEmail(req.body).then((user) => {
            res.send({
                success: true,
                data: "Email Available "
            })
        }).catch((err) => {
            res.status(400).send({
                success: false,
                data: "Email Not Available"
            })
        })
    }

};


function generateJwt(id) {
    return jwt.sign({
        id: id
    }, app_config.jwt_secret.session, {
        expiresIn: app_config.jwt_secret.token_expiration
    });
}

function verifyJwt() {

    return compose()
        // Attach user to request
        .use(function (req, res, next) {
            const authHeader = req.headers.authorization;
            // const refresh_token = req.headers.refresh_token;
            if (authHeader) {
                jwt.verify(authHeader, app_config.jwt_secret.session, (err, user) => {
                    if (err) {
                        return res.status(401).send({
                            success: false,
                            data: "Auth Expired !",
                        });
                    } else {
                        redis.get(user.id, (data) => {
                            if (data) {
                                req.user = JSON.parse(data)
                                // console.log("user loaded from cache")
                                next();
                            } else {

                                userService.getUserId(user.id).then((user) => {
                                    // console.log("db request")
                                    redis.set(user.id, JSON.stringify(user))
                                    req.user = user
                                    next();
                                }).catch((err) => {
                                    return res.status(401).send({
                                        success: false,
                                        data: "User Not Found !" + err,
                                    });
                                })
                            }
                        })
                    }

                })
            } else {
                return res.status(401).send({
                    success: false,
                    data: "No auth provided !",
                });
            }
        });
}

exports.verifyJwt = verifyJwt;
