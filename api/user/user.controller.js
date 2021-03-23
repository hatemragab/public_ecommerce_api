'use strict';
const usersServices = require("./user.service")

exports.get_users = (req, res, next) => {

    usersServices.getUsers(req.user.id, req.params.lastId).then((data) => {
        res.send({success: true, data});
    }).catch((err) => {
        return res.status(400).send({success: false, data: err});
    });
};
exports.get_user_id = (req, res, next) => {
    req.checkParams("id", "Id missing").notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({

            success: false,
            data: errors[0].msg
        })
    } else {
        usersServices.getUserId(1).then((data) => {
            console.log(data);
            res.send({success: true, data});
        }).catch((err) => {
            console.log(err);
            return res.status(400).send({success: false});
        });
    }
}

exports.search_user = (req, res, next) => {
    req.checkQuery("text", "search query missing").notEmpty()
    req.checkQuery("lastId", "search query lastId").notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({
            success: false,
            data: errors[0].msg
        })
    }
    const searchQuery = req.query.text;
    const lastId = req.query.lastId;
    usersServices.searchUser({text: searchQuery, lastId: lastId,myId:req.user.id}).then((users) => {
        res.send({
            success: true,
            data: users
        })
    }).catch((err) => {
        res.status(400).send({
            success: false,
            data: "Error is " + err.toString()
        })
    })


};

exports.create_user = (req, res, next) => {
    req.checkBody("name", "name missing").notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({
            success: false,
            data: errors[0].msg
        })
    } else {
        usersServices.createUser(req.body.name).then((data) => {
            res.status(201).send({success: true, data});
        }).catch((err) => {
            return res.status(400).send({success: false, data: err['name']});
        });
    }

}
