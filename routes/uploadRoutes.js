const express = require('express')
const router = express.Router()
const asyncHandler = require("express-async-handler")
const cloudinary = require('../config/cloudinary')
const upload = require ('../middleware/multer')
const Image = require('../model/image')

module.exports = router
//POST upload

router.post('/add', upload.single('image'), asyncHandler(async (req, res, next) => {

    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        
        res.json(result)

        let imageUploads = new Image({
            name: req.body.name,
            image:result.secure_url,
            cloudinary_id: result.public_id
        })

        //Save Uploads to MongoDB atlas
        const createdImages = await imageUploads.save()
        res.status(201).json(createdImages)
    }
    catch(err){
        console.log(err);
    }
 }))
//GET Uploaded files
 router.get('/',asyncHandler(async(req,res)=>{
    try{
        let createdImage = await Image.find()
        res.json(createdImage)
    }catch(err)
    {
        console.log(err);
    }
 }))

 //GET a specific file
 router.get('/:id',asyncHandler(async(req,res)=>{
    try{
        //Find upload by id
        let createdImage = await Image.findById(req.params.id)
        res.json(createdImage)
    }catch(err)
    {
        console.log(err);
    }
 }))




 router.put('/update/:id', upload.single('image'), asyncHandler(async (req, res) => {

    try {
  
      let imageUploads = await Image.findById(req.params.id);
      await cloudinary.uploader.destroy(imageUploads.cloudinary_id)
  
      const result = await cloudinary.uploader.upload(req.file.path)
  
      const { name } = req.body;
  
      dataUpdate = {
        name: name || imageUploads.name,
        image: result.secure_url || imageUploads.avatar,
        cloudinary_id: result.public_id || user.cloudinary_id
      }
      imageUploads = await Image.findByIdAndUpdate(req.params.id, dataUpdate, { new: true })
      res.status(201).json(imageUploads);
  
  
    } catch (err) {
      console.log(err)
      throw new Error('Upload Cannot Be Found')
    }
  
  }))

  //Delete Upload Route
router.delete('/delete/:id', asyncHandler(async (req, res) => {
    try {
      const imageUploads = await Image.findById(req.params.id);
      console.log(imageUploads)
      await cloudinary.uploader.destroy(imageUploads.cloudinary_id)
      //.remove is deprecated
      //await imageUploads.remove();
      await imageUploads.deleteOne();
      res.json({ message: "Image Deleted Successfully" });
    } catch (err) {
      console.log(err)
      throw new Error('Upload Cannot Be Found')
    }
  }))

  module,exports = router