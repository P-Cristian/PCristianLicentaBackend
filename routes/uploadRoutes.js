const express = require('express')
const router = express.Router()
const asyncHandler = require("express-async-handler")
const cloudinary = require('../config/cloudinary')
const upload = require ('../middleware/multer')
const Image = require('../model/image')

module.exports = router
//POST upload

router.post('/add', upload.single('image'), asyncHandler(async (req, res, next) => {
    console.log("AM TRECUT")
    try{
        console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("AM AJUNS");
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
 }))




