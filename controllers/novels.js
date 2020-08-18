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

router.get("/list", (req, res)=>{

    NovelModel.find((err, docs)=>{
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

router.get('/delete', function(req, res){
    console.log(req.url);
    res.sendFile(process.cwd() + '/views/delete.html');
  });

router.delete("/delete", function(req, res){
    console.log(req.body);
    var record = req.body;
// const res = await Character.remove({ name: 'Eddard Stark' });
// res.deletedCount; // Number of documents removed
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