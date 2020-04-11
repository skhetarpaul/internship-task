const express = require("express");
const router = express.Router();
const multer = require('multer')
const validateRegisterInput = require("../../validation/register");
const validateCompetitionInput = require('../../validation/competitions')
const validateSubmissionsInput = require('../../validation/submissions')

const User = require("../../models/User");

const Submission = require('../../models/Submission')
const Competition = require('../../models/Competition')

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
        });
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
      }
    });
  });
  router.get("/view-user",(req, res) => {
    const _id = req.query.id
    User.findOne({_id}).then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "no user found with these credentials" });
      }
      else {
        console.log(user, "view-user data fetched")
        res.json(user)
      }
    })
  })

  router.post("/create-competition", (req, res) => {

    const { errors, isValid } = validateCompetitionInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const newCompetition = new Competition({
        name: req.body.name,
        description: req.body.description,
        author : req.body.author,
      });
      newCompetition
        .save()
        .then(competition => res.json(competition))
        .catch(err => {
          console.log(err)
          res.json(err)});
    }
    catch(err) {
      console.log(err)
      res.json(err)
    }  
  });

  router.post("/create-submission", (req, res) => {

    const { errors, isValid } = validateSubmissionsInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const newSubmission = new Submission({
        image: req.body.image,
        competition: req.body.competition,
        author : req.body.author,
      });
      newSubmission
        .save()
        .then(submission => res.json(submission))
        .catch(err => {
          console.log(err)
          res.json(err)});
    }
    catch(err) {
      console.log(err)
      res.json(err)
    }  
  });

  router.get('/competition', (req, res) => {
    const author = req.query.authorId
    Competition.find({author}).then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "no competition found with these credentials" });
      }
      else {
        console.log(user, "competition data fetched")
        res.json(user)
      }
    })
  })

  router.get('/submission', (req, res) => {
    const competition = req.query.competitionId
    Submission.find({competition}).then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "no submissions found with these credentials" });
      }
      else {
        console.log(user, `submissions for ${competition} fetched`)
        res.json(user)
      }
    })
  })

  //for image upload

  // var Storage = multer.diskStorage({
  //   destination: "../../public/uploads/",
  //   filename:(req, file,cb) => {
  //     cb(null, file.fieldname + "_" + Date.now()+ Path2D.extname(file.originalname))
  //   }
  // })
  // var upload = multer({
  //   storage: Storage
  // }).single('file');
  // router.post('/upload', upload, function(req, res) {
  //   var imageFile = req.file.filename;
  //   var success= req.file.filename + "uploaded successfully"
  //   var imageDetails = new UploadImage({
  //     img: imageFile
  //   })
  //   imageDetails.save(function(err, data) {
  //     if (err) throw err
  //     res.render('upload-file', {title: 'Upload File', success: success})
  //   })
  // })
  module.exports = router;