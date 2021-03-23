const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
let expressValidator = require('express-validator');
const cors = require('cors');
const helmet = require('helmet'); // helmet morgan body-parser mongoose
const morgan = require('morgan');
const app = express();


module.exports = app;


module.exports = function (app) {
    app.use(expressValidator());
    app.disable('x-powered-by');
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan('combined'));
    app.use(cookieParser());
   // app.use("/uploads",express.static(path.join(__dirname, 'public')));
    app.use('/api/v1/public', express.static('public'));


    require('../routes')(app);


    // app.use(function (req, res, next) {
    //     let err = new Error('Not Found');
    //     err.status = 404;
    //     console.log(err);
    //     // respond with html page
    //     if (req.accepts('html')) {
    //         res.status(404).send({error: true, data: "Page Not Found 404 !"})
    //         return;
    //     } else {
    //         next(err);
    //     }
    //
    // });


}
