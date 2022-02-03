
var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var Movie = require('./models/movie');
var user = require('./models/user');

//to get data
router.get("/movies",async(req,res)=>{
   const imovie = await movie.find();
   res.send(imovie);
   console.log(imovie);
})

//to post data
router.post("/movies",async(req,res)=>{
   const imovie = new Movie({
      name:req.body.name,
      rating:req.body.rating
   })

   await imovie.save((err,msg)=>{
      if(err){
         res.status(500).json({
            "error":err
         })
      }
      else{
         res.status(200).json({
            "message":msg
         })
      }
   })
});

//to update data
router.patch('/movies/:id',async(req,res)=>{
   const imovie = await Movie.findOne({_id:req.params.id})
   imovie.name = req.body.name
   imovie.rating = req.body.rating

   await imovie.save((err,msg)=>{
      if(err){
         res.status(500).json({
            error:err
         })
      }
      else{
         res.status(200).json({
            msg:msg
         })
      }
   })
})

//to delete data
router.delete('/movies/:name',async(req,res)=>{
   await Movie.deleteOne({name:req.params.name},
      (err,msg)=>{
         if(err){
            res.status(500).json({
               error:err
            })
         }
         else{
            res.status(200).json({
               msg:msg
            })
         }
      })
})

router.post('/users',async(req,res)=>{

   
   const iuser = new user({
      uname:req.body.uname,
      password:req.body.password
   })

   await user.save((err,msg)=>{
      if(err){
         res.status(500).json({
            error:err
         })
      }
      else{
         res.status(200).json({
            msg:msg
         })
      }
   })
})
 
module.exports = router