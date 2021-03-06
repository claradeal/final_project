// controls all the routes, connects to mongodb and returns the template

const express = require("express");
const mongoose = require("mongoose");
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
});

// Read - List all Novels
router.get("/list", (req, res)=>{

    NovelModel.find().lean().exec((err, docs)=>{
      if(!err) {
        console.log(docs);
        res.locals.docs = docs;
        res.render("list", { data : docs });
      }
      else {
          res.send("error");
      }
    });  
});

// Read - List Novel Details
router.get("/details", (req, res)=>{

  NovelModel.find().lean().exec((err, docs)=>{
    if(!err) {
      console.log(docs);
      res.locals.docs = docs;
      res.render("details", { data : docs });
    }
    else {
        res.send("error");
    }
  });  
});

// Update a Novel
router.put('/:id', (req, res) => {
  let _id = req.params.id;
  let {novelTitle, novelAuthorFirstName, novelAuthorLastName, novelId} = req.body;
  console.log(req.body);

  NovelModel.findOneAndUpdate({_id}, {novelTitle, novelAuthorFirstName, novelAuthorLastName, novelId}, {new: true})
      .then(doc => res.json(doc))
      .catch(err => res.json({err}))
});

// Delete a Novel
router.delete('/:id', (req, res) => {
  let _id = req.params.id;
  
  NovelModel.findOneAndDelete({_id})
      .then(doc => res.json(doc))
      .catch(err => res.json({err}))
})

// router.get('/delete', function(req, res){
//     console.log(req.url);
//     res.sendFile(process.cwd() + '/views/delete.html');
//   });

// // Delete first Novel in list
// router.delete("/delete", function(req, res){
//     console.log(req.body);
//     var record = req.body;

//     NovelModel.deleteOne((err, record)=>{
//     res.deletedCount;
//     if(!err) {
//         res.redirect("/novel/list");
//         }
//     else {
//         res.send("error with delete");
//         }
//     });
// });

// export the router
module.exports = router;