'use strict';
const _ = require('underscore');

const user = require('../../models').user
const Op = require('sequelize').Op
const authService = require('../auth/auth.service')

let usersServices = (function () {
    let _getUsers = (userId, lastId) => {
        return new Promise((resolve, reject) => {
            user.findAll({
                where: {
                    [Op.not]: {
                        id: userId
                    },
                    id: {
                        [Op.gt]: lastId
                    }
                },
                order: [["id", "ASC"]],
                limit: 20
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err)
            })

        });
    };
    let _getUserId = (userId) => {

        return new Promise((resolve, reject) => {

            user.findByPk(userId, {
                attributes: {
                    include: [
                        "id",
                        "name",
                        "image"
                    ]
                }
            }).then((user) => {
                resolve(user)
            }).catch((err) => {
                reject(err)
            })


        });
    };

    let _login = (options) => {
        return new Promise((resolve, reject) => {
            user.scope('withPassword').findOne({where: {email: options.email}}).then((user) => {
                authService.comparePassword(options.password, user.password, (err, isMatch) => {
                    if (!err && isMatch) {
                        user.password = undefined;
                        resolve(user)
                    } else {
                        reject(err)
                    }
                })
            }).catch((err) => {
                reject(err)
            })
        });
    }
    let _register = (options) => {
        return new Promise((resolve, reject) => {
            authService.cryptPassword(options.password, (err, password) => {
                if (err) {
                    reject(err)
                } else {
                    user.create({
                        name: options.name,
                        //  image: options.img,
                        //  imageThumb: options.imgThumb,
                        email: options.email,
                        password: password,
                        createdAt: Date.now()
                    }).then((data) => {
                        let dataWithOutPassword = data.toJSON();
                        delete dataWithOutPassword['password']
                        resolve(dataWithOutPassword)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            })
        });
    }
    let _checkEmail = (options) => {
        return new Promise((resolve, reject) => {
            user.findOne({where: {email: options.email}}).then((data) => {
                if (data)
                    reject("Not available")
                else resolve("available")
            }).catch((err) => {
                reject(err)
            })
        });
    }

    let _searchUser = (options) => {
        return new Promise((resolve, reject) => {
            user.findAll({
                where: {
                    [Op.not]: {
                        id: options.myId
                    },
                    [Op.or]: {
                        name: {
                            [Op.like]: `${options.text}%`
                        },
                        email: {
                            [Op.like]: `${options.text}%`
                        }
                    },
                    id: {
                        [Op.gt]: options.lastId
                    }

                },
                order: [["id", "ASC"]],
                limit: 20
            }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        });
    }

    let _getUsersDataList = (usersId) => {

        return new Promise((resolve, reject) => {
            user.findAll({where: {id: usersId}}).then((users) => {

                resolve(users)
            }).catch((err) => {
                reject(err);
            })
        });
    }


    return {
        getUsers: _getUsers,
        getUserId: _getUserId,
        login: _login,
        register: _register,
        getUsersDataList: _getUsersDataList,
        checkEmail: _checkEmail,
        searchUser: _searchUser,
    }
})()

module.exports = usersServices
