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
        }
      });
    }
};


const facultiesList = (req,res) =>{
  let faculty = [];
  let data = [];
  const faculties = {
    Femail: req.body.mail,
    Fid:req.body.Fid,
    Fname:req.body.Fname,
    Fsubject:req.body.Fsubject,
    Fcontact:req.body.Fcontact,
    Fposition:req.body.Fposition
} 
  
    new facultyAdd(faculties)
        .save()
        .then(e=>{
          res.redirect('/list-of-faculties')
        })
     
};

const showAllFaculties = (req,res) =>{
     facultyAdd.find({})
     .sort()
     .then(staff => {
      res.render('listoffaculties',{
           staff: staff        
      })
     })
}

const editFaculties = (req,res) =>{
  facultyAdd.findOne({
    _id: req.params.id
  })
  .then(faculty =>{
    res.render('editFaculty',{
      faculty:faculty
    })
  })
}

const updateFaculties = (req,res) =>{
   facultyAdd.findOne({
     _id:req.params.id
   })
   .then(faculty => {
    faculty.Femail= req.body.mail;
    faculty.Fid=req.body.Fid;
    faculty. Fname=req.body.Fname;
    faculty.Fsubject=req.body.Fsubject;
    faculty.Fcontact=req.body.Fcontact;
    faculty.Fposition=req.body.Fposition;

    faculty.save()
           .then(faculty => {
             res.redirect('/list-of-faculties')
           })

   })
}

const removeFaculties = (req,res) => {
  facultyAdd.remove({_id:req.params.id})
             .then(()=>{
               res.redirect('/list-of-faculties')
             })
}

const hod = function(req,res){
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
};
const teacher = function(req,res){
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
};


module.exports = {
  index,
  sendtimetable,
  facultiesList,
  showAllFaculties,
  editFaculties,
  updateFaculties,
  removeFaculties,
  teacher,
  hod
};
