const mongoose = require('mongoose');
const sendTimetables = mongoose.model('sendTimetables');
const facultyAdd = mongoose.model('addFaculty');
const teacherFind = mongoose.model('teacher');
const hodFind = mongoose.model('hod');
// const mailer =  require('../models/mail');
/* GET home page */
const index = function(req, res){
  res.render('index', { title: 'Routed through Controller main.js' });
};

const sendtimetable = function(req, res) 
{
  let errors = [];
  let data = [];  
    if(!req.body.Stream){
        errors.push({text: 'Please add Stream for which You made timetable'})
    }
    if(!req.body.section){
        errors.push({text:'Please add Section'});
    }
    if(!req.body.Year){
        errors.push({text:'Please add Year of Section'});
    }

    if(errors.length>0){
        res.render('showtable',{
            errors:errors,
            Stream: req.body.Stream,
            section: req.body.section,
            Year: req.body.Year,
            Day:req.body.Day
        });
    }
    else{

        const makeTable = {
          Stream: req.body.Stream,
          section: req.body.section,
          Year: req.body.Year,
          Day:req.body.Day,
          Subject: req.body.Subject,
          Venue: req.body.Venue  
        }
      
        sendTimetables.create(
        makeTable,
       (err,sendTimetables) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else { 
            res.render("showtable",{
            data:makeTable
          });
          
            // .status(201)
            // .json(senjsdTimetables);
        }
      });
    }
};


const facultiesList = (req,res) =>{
  let faculty = [];
  const faculties = {
    Femail: req.body.mail,
    Fid:req.body.Fid,
    Fname:req.body.Fname,
    Fsubject:req.body.Fsubject,
    Fcontact:req.body.Fcontact,
    Fposition:req.body.Fposition
} 
  facultyAdd.create(faculties,
    (err,facultyAdd)=>{
      if(err){
        res
          .status(404)
          .json(err)
      }
      else{
        res
          .status(201)
          .render('moderator')
      }
    });
};
const hod = function(req,res){
 hodFind.findOne({
    hodmail: req.body.hod
  },(err,hodFind) =>{
    if(!hodFind){
      res
        .status(400)
        .send(err);
    }
    else{
      console.log("FOUND");
        facultyAdd.findOne({
          Femail: req.body.hod
        },(err,facultyAdd)=>{
          if(!facultyAdd){
            res
            .status(400)
            .send(err);
          }
          else{
            res
              .status(201)
              .render('HOD',{data:facultyAdd})
          }
        });
        }
  });
};
const teacher = function(req,res){
  teacherFind.findOne({
    teachermail: req.body.teacher
  },(err,teacherFind) =>{
    if(!teacherFind){
      res
        .status(400)
        .send(err);
    }
    else{
        facultyAdd.findOne({
          Femail: req.body.teacher
        },(err,facultyAdd)=>{
          if(!facultyAdd){
            res
            .status(400)
            .send(err);
          }
          else{
            res
              .status(201)
              .render('teacher',{data:facultyAdd})
          }
        });
        }
  });
};

const findAll = (req,res)=>{
  facultyAdd.find({
    Fid:req.body.Fid,
    Fname:req.body.Fname,
    Fsubject:req.body.Fsubject,
    Fcontact:req.body.Fcontact,
    Fposition:req.body.Fposition
  }) ,
  (err,facultyAdd)=>{
    if(err){
      res
        .status(404)
        .json(err)
    }
    else{
      res
        .status(201)
        .render('listoffaculities');
    }
  };
};
module.exports = {
  index,
  sendtimetable,
  facultiesList,
  findAll,
  teacher,
  hod
};
