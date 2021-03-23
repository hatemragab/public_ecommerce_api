'use strict';
const path = require('path')
const sharp = require('sharp')
const multer = require('multer');
const microTime = require('microtime')
const authRouter = require('express').Router();
const authController = require('./auth.controller');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, callback) {
        callback(null,  microTime.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback('Only images are allowed', false)
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 25,
        files: 1
    },
}).single('file');

authRouter.post("/login", authController.login)
    .post("/register",authController.register)
    .post("/check_email",authController.check_email)
    .put("/", (req, res) => {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(413).send({success: false, data: "Error While upload image " + err.toString()})
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(413).send({success: false, data: "Error While upload image " + err.toString()})
            }

            const {filename: image} = req.file

            await sharp(req.file.path)
                .resize(1000)
                .jpeg({quality: 70})
                .toFile(
                    path.resolve(req.file.destination, 'profile_images', image)
                )
            let thumbName = `${'thumb_' + microTime.now()}.jpg`
            await sharp(req.file.path)
                .resize(200)
                .jpeg({quality: 50})
                .toFile(
                    path.resolve(`public/images`, `profile_images`, thumbName)
                )

            fs.unlinkSync(req.file.path)

            let name = req.file.filename;
            res.status(201).send({success: true, data: {url: name, thumbUrl: thumbName}})
        })

    })


module.exports = authRouter;
