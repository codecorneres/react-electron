var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer  = require('multer')

var Form = require('../models/Forms.js');

router.get('/', function(req, res, next) {
  Form.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Form.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Form */
var imageName;
var uniqname;
var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/upload');
    },
    filename: function (req, file, cb) {
       console.log(file);
        imageName = file.fieldname + "_" +Date.now() + "_" + file.originalname;
        uniqname =imageName;;
        cb(null, imageName);
    }
});
var upload = multer({storage: uploadStorage});

router.post('/upload',upload.single('image'), function(req, res, next) {
  console.log(req.file.originalname)
  console.log(uniqname)
  req.body.file = uniqname;
  Form.create(req.body, function (err, post) {

    if (err) return next(err);
    res.json(req.file);
  });
});

router.post('/', function(req, res, next) {
  Form.find().where({"email": req.body.email})
    .count(function(err,count, data){  
    if(err){  
       res.json(err);                
    }  
    else{    
      if(count == "1")
      {
        res.json({data:"The email address you have entered is already registered"}); 
      }   
      else{
        Form.create(req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      }
    }
  })
});

var imagerName;
var uniqrname;
var uploadRStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/upload');
    },
    filename: function (req, file, cb) {
        imagerName = file.fieldname + "_" +Date.now() + "_" + file.originalname;
        uniqrname =imagerName;;
        cb(null, imagerName);
    }
});
var uploadR = multer({storage: uploadRStorage});

router.post('/resume',uploadR.single('resume'), function(req, res, next) {
  console.log(req.body)
  Form.find().where({"email": req.body.email})
    .count(function(err,count, data){  
    if(err){  
       res.json(err);                
    }  
    else{    
      if(count == "1")
      {
        res.json({data:"The email address you have entered is already registered"}); 
      }   
      else{
        req.body.resume = uniqrname;
        console.log(req.body)
        Form.create(req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      }
    }
  })
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Form.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Form.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* Match Login */
router.post('/match', function(req, res, next) {
Form.find().where({"email": req.body.email,"password": req.body.password})
          .count(function(err,count, data){  
      if(err){  
         res.json(err);                
      }  
      else{    
        if(count == "1")
        {
          res.json({data:"Matching"}); 
        }   
        else{
          res.json({data:"Invalide Username Or Password"}); 
        }  
      } 
 });
});
module.exports = router;