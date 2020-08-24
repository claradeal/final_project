// controls all the routes, connects to mongodb and returns the template

const express = require("express");
const mongoose = require("mongoose");

// added after talking with Jared on Aug 13 - not sure needed here
const expressHandlebars = require('express-handlebars');

const router = express.Router();
const NovelModel = mongoose.model("Novel");

router.get('/add', function(req, res){
  console.log(req.url);
  res.sendFile(process.cwd() + '/views/index.html');
});

//  Create a Novel
router.post('/add', function(req, res){
    console.log(req.body);

    var novel = new NovelModel();
    novel.novelTitle = req.body.novelTitle;
    novel.novelAuthorFirstName = req.body.first;
    novel.novelAuthorLastName = req.body.last;
    novel.novelId = Math.ceil(Math.random() * 10000);
    novel.save((err, doc)=>{

    if(!err) {
       res.redirect("/novel/list");
      }
      else {
          res.send("error with post");
      }
    })
    //   res.sendFile(process.cwd() + '/views/list.html');
});

// List all Novels
router.get("/list", (req, res)=>{

    NovelModel.find().lean().exec((err, docs)=>{
      if(!err) {
        console.log(docs);
        // added with Jared's help Aug 13
        res.locals.docs = docs;
        // res.send({data : docs});
        res.render("list", { data : docs });
      }
      else {
          res.send("error");
      }
    });  
});

// Hello there world - hbs.
router.get('/', function(req, res){
  console.log(req.url);
  res.sendFile(process.cwd() + '/views/index.html');
});

// router.get('/update', function(req, res){
//   console.log(req.url);
//   res.sendFile(process.cwd() + '/views/update.html');
// });

// I am not sure if this is causing problems!
// router.get('/:id', (req, res) => {
//   console.log(req.body);
// });

// Update a Novel
router.put('/:id', (req, res) => {
  let _id = req.params.id;
  let {novelTitle, novelAuthorFirstName, novelAuthorLastName, novelId} = req.body;
  console.log(req.body);

  NovelModel.findOneAndUpdate({_id}, {novelTitle, novelAuthorFirstName, novelAuthorLastName, novelId}, {new: true})
      .then(doc => res.json(doc))
      .catch(err => res.json({err}))
});

// List Novel Details
router.get("/details", (req, res)=>{

  NovelModel.find().lean().exec((err, docs)=>{
    if(!err) {
      console.log(docs);
      // added with Jared's help Aug 13
      res.locals.docs = docs;
      // res.send({data : docs});
      res.render("details", { data : docs });
    }
    else {
        res.send("error");
    }
  });  
});

router.get('/delete', function(req, res){
    console.log(req.url);
    res.sendFile(process.cwd() + '/views/delete.html');
  });

// Delete a Novel
router.delete("/delete", function(req, res){
    console.log(req.body);
    var record = req.body;

    NovelModel.deleteOne((err, record)=>{
    res.deletedCount;
    if(!err) {
        res.redirect("/novel/list");
        }
    else {
        res.send("error with delete");
        }
    });
});

// export the router
module.exports = router;