'use strict';

const usersRoute = require('express').Router();
const usersController = require('./user.controller');


usersRoute
    .get("/all/:lastId", usersController.get_users)
    .get("/search", usersController.search_user)
    .get("/id", usersController.get_user_id)
    .post("/", usersController.create_user)


module.exports = usersRoute;
