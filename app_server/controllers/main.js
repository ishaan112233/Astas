const mongoose = require('mongoose');
const sendTimetables = mongoose.model('sendTimetables');
const facultyAdd = mongoose.model('addFaculty');
const teacherFind = mongoose.model('teacher');
const hodFind = mongoose.model('hod');
const uploadedVenues = mongoose.model('venues') ;
const section = mongoose.model('section');
const multer = require('multer');
const path = require('path');
const exceltojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('244087AEm1pdREMM5bced951',"Hi, your OTP is {{otp}}, please don't share it with ANYBODY!");
sendOtp.setOtpExpiry('1');
const storage = multer.diskStorage({
  destination: '../../public/uploaded-files',
  filename: (req,file,cb) => {
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req,file,cb)=>{
    if(file.mimetype==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      return cb(null,true)
    }
      cb('Error: Excel files Only')
  }
}).single('file');

// For uploading Venues Excel file

const upload1 = multer({
  storage: storage,
  fileFilter: (req,file,cb)=>{
    if(file.mimetype==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      return cb(null,true)
    }
    console.log(file.mimetype)
      cb('Error: Excel files Only')
    
  }
}).single('file1');

//  For uploading sections requirements file

// For uploading requirements of each section


const upload2 = multer({
  storage: storage,
  fileFilter: (req,file,cb)=>{
    if(file.mimetype==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      return cb(null,true)
    }
    console.log(file.mimetype)
      cb('Error: Excel files Only')
    
  }
}).single('file2');




/* GET home page */ 

const index = function(req, res){
  res.render('index', { title: 'Routed through Controller main.js' });
};

const timeTable = (req,res) => {

  facultyAdd.find({})
            .then(fact => {
              res.render('timetable',{
                  fact:fact
              })
            })
}

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
          Venue: req.body.Venue,  
          id: req.body.section
        }
      
        sendTimetables.create(
        makeTable,
       (err,sendTimetables) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else { 
            res.render('showtable',{
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
    Fposition:req.body.Fposition,
    Flectures:req.body.Flectures,
    Fclass:req.body.Fclass,
    Fyear:req.body.Fyear,
    Fpsubject:req.body.Fpsubject,
    Fpyear:req.body.Fpyear,
    Fpclass:req.body.Fpclass
} 
  
    new facultyAdd(faculties)
        .save()
        .then(e=>{
          res.redirect('/list-of-faculties')
        })
  
};

const showTeacher = (req,res) =>{
  facultyAdd.find({})
            .then(fact => {
              res.render('showTeachers',{
                  fact:fact
              })
            })
}

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
    faculty.Flectures=req.body.Flectures;
    faculty.Fclass=req.body.Fclass;
    faculty.Fyear=req.body.Fyear;
    faculty.Fpsubject=req.body.Fpsubject;
    faculty.Fpyear=req.body.Fpyear;
    faculty.Fpclass=req.body.Fpclass;

    faculty.save()
           .then(faculty => {
             res.redirect('/list-of-faculties')
           })

   })
}

// const removeFaculties = (req,res) => {
//   facultyAdd.remove({_id:req.params.id})
//              .then(()=>{
//                res.redirect('/list-of-faculties')
//              })
// }

// const hod = function(req,res){
//         facultyAdd.findOne({
//           Femail: req.body.hod
//         },(err,facultyAdd)=>{
//           if(!facultyAdd){
//             res
//             .status(400)
//             .send(err);
//           }
//           else{
//             res
//               .status(201)
//               .render('HOD',{data:facultyAdd})
//           }
//   });
// };
// const teacher = function(req,res){
//         facultyAdd.findOne({
//           Femail: req.body.teacher
//         },(err,facultyAdd)=>{
//           if(!facultyAdd){
//             res
//             .status(400)
//             .send(err);
//           }
//           else{
//             res
//               .status(201)
//               .render('teacher',{data:facultyAdd})
//           }
//   });
// };


const uploadFiles = (req,res) =>{
      res.render('uploadList')
}

const showFilesData = (req,res) =>{
  let exceltojson;
  let uploadedData = [];
    upload(req,res,(err)=>{
      if(err){
        res.render('uploadList',{
          msg:err
        })
      }
      else{
        if(req.file.originalname.split('.')
        [req.file.originalname.split('.').length-1]==='xlsx'){
          exceltojson = xlsxtojson
          console.log('it is xlsx file')
        }
        else{
          exceltojson = xlstojson;
          console.log('it is xls file')
        }
        console.log(req.file);
       

        try{
          exceltojson({
            input: req.file.path,
            output: null,
            //sheet:"venue_selection",
            lowerCaseHeaders:true
          },(err,result)=>{
            if(err){
              res.send(err)
              return;
            }
            let randomRest = [];
           
            res.render('upload',{
                uploadedData:result
            })
        

           result.forEach((rest)=>{
             facultyAdd.create({
              Femail:rest.email,
              Fid:rest.faculty_id,
              Fname:rest.faculty_name,
              Fposition:rest.position,
              Flectures:rest.lectures,
              Fsubject:rest.subjects,
              Fclass:rest.section,
              Fyear:rest.currentt_year,
              Fpsubject:rest.pastsubjects,
              Fpyear:rest.year,
              Fcontact:rest.contact,
             // Branch:rest.branch,
              Fpclass:rest.p_section       
            },(err,rec)=>{
              if(err){
                console.log(err)
                return;
              }
            })
           })
          })
      
        }
        catch(e){
          res.send('Corrupted Excel file')
        }
      }
    })
//  res.redirect('/list-of-faculties')
}


const venueList = (req,res) => {
  let exceltojson;
  let uploadedData = [];
    upload1(req,res,(err)=>{
      if(err){
        res.render('venuesList',{
          msg1:err
        })
      }
      else{
        if(req.file.originalname.split('.')
        [req.file.originalname.split('.').length-1]==='xlsx'){
          exceltojson = xlsxtojson
        }
        else{
          exceltojson = xlstojson;
        }
       
        try{
          exceltojson({
            input: req.file.path,
            output: null,
            lowerCaseHeaders:true
          },(err,result)=>{
            if(err){
              res.send(err)
              return;
            }
            
          result.forEach(rest => {
             uploadedVenues.create({
              food:rest.food,
              block:rest.block,
              venue:rest.venue,
              type:rest.type,
              floor:rest.floor,
              venuecapacity:rest.venuecapacity,
              projector:rest.projector,
              podium:rest.podium,
              lanports:rest.lanports,
              powerports:rest.powerports,
              ac:rest.ac,
              whiteboard:rest.whiteboard,
              roundtable:rest.roundtable,
              flexlayout:rest.flexlayout,
              av:rest.av,
              classtype:rest.classtype,
              nearparking:rest.nearparking,
              nearwashroom:rest.nearwashroom,
              nearlift:rest.nearlift  
             },
             (err,rec)=>{
              if(err){
                console.log(err)
                return;
              }
            })
           })
//         console.log(uploadedVenues.food)
  //          res.render('venuesList',{
    //          uploadedData:result
      //      })
          })  
        }
        catch(e){
          res.send('Corrupted Excel file')
        }
      }
    }) 
}

const showAllVenues = (req,res)=>{
       uploadedVenues.find({})
                      .sort()
                      .then(venue => {
                        res.render('venuesList',{
                        venue:venue
                        })
                      })
}

const sectionsList = (req,res) => {
  let exceltojson;
  let uploadedData = [];
    upload2(req,res,(err)=>{
      if(err){
        res.render('venuesList',{
          msg1:err
        })
      }
      else{
        if(req.file.originalname.split('.')
        [req.file.originalname.split('.').length-1]==='xlsx'){
          exceltojson = xlsxtojson
        }
        else{
          exceltojson = xlstojson;
        }
       
        try{
          exceltojson({
            input: req.file.path,
            output: null,
            lowerCaseHeaders:true
          },(err,result)=>{
            if(err){
              res.send(err)
              return;
            }
            
          result.forEach(rest => {
             section.create({
              Section:rest.section,
              Stream:rest.stream,
              Students:rest.students,
              Year:rest.year,
              Faculty:rest.faculty.split(","),
              Subjects:rest.subjects.split(","),
              food:rest.food,
              block:rest.block,
              venue:rest.venue,
              type:rest.type,
              floor:rest.floor,
              projector:rest.projector,
              podium:rest.podium,
              lanports:rest.lanports,
              powerports:rest.powerports,
              ac:rest.ac,
              whiteboard:rest.whiteboard,
              roundtable:rest.roundtable,
              flexlayout:rest.flexlayout,
              av:rest.av,
              classtype:rest.classtype,
              nearparking:rest.nearparking,
              nearwashroom:rest.nearwashroom,
              nearlift:rest.nearlift  
             })
           })
//         console.log(uploadedVenues.food)
  //          res.render('venuesList',{
    //          uploadedData:result
      //      })
          })  
        }
        catch(e){
          res.send('Corrupted Excel file')
        }
      }
    }) 

  
}



const beforeTimetableForm = (req,res) => {
  res.render('timetableform')
}

const showSectionData = (req,res)=>{
      section.find({
        Stream:req.stream,
        Section:req.section,
        Year:req.year
      })
      console.log(req.body)
}


const showSectionRequirements = (req,res) => {

  let exceltojson;
  let uploadedData = [];
    upload2(req,res,(err)=>{
      if(err){
        res.render('venuesList',{
          msg1:err
        })
      }
      else{
        if(req.file.originalname.split('.')
        [req.file.originalname.split('.').length-1]==='xlsx'){
          exceltojson = xlsxtojson
        }
        else{
          exceltojson = xlstojson;
        }
       
        try{
          exceltojson({
            input: req.file.path,
            output: null,
            lowerCaseHeaders:true
          },(err,result)=>{
            if(err){
              res.send(err)
              return;
            }
            
          result.forEach(rest => {
             section.create({
              Stream:rest.stream,
              Year: rest.year,
              Section:rest.section,
              Students:rest.students,
              Faculty:rest.faculty.split(","),
              Subjects:rest.subjects.split(","), 
              food:rest.food,
              block:rest.block,
              venue:rest.venue,
              type:rest.type,
              floor:rest.floor,
              projector:rest.projector,
              podium:rest.podium,
              lanports:rest.lanports,
              powerports:rest.powerports,
              ac:rest.ac,
              whiteboard:rest.whiteboard,
              roundtable:rest.roundtable,
              flexlayout:rest.flexlayout,
              av:rest.av,
              classtype:rest.classtype,
              nearparking:rest.nearparking,
              nearwashroom:rest.nearwashroom,
              nearlift:rest.nearlift  
             },
             (err,rec)=>{
              if(err){
                console.log(err)
                return;
              }
            })
           })
//         console.log(uploadedVenues.food)
  //          res.render('venuesList',{
    //          uploadedData:result
      //      })
          })  
        }
        catch(e){
          res.send('Corrupted Excel file')
        }
      }
    }) 

    
}

const showListOfRequirements = (req,res) => {
  res.render('sectionsList')
       section.find({})
              .sort()
              .then((list) => {
                  list:list
              },
              )
              res.redirect('/section-requirements/list')
}


const formBeforeTimetable = (req,res) => {
  res.render('beforeTimetable')
}
const findtimetable = (req,res)=>{
  // console.log(req.params.id);
  sendTimetables.findOne({
    id: req.params.id
  },(err,sendTimetables)=>{
    data = sendTimetables;
    // console.log(data);
      if(!data){
        res
        .status(404)
        .render('error');
      }
      else{
        res
        .status(201)
        .render('showtable',{data});
      }
  })
}
const removeFaculties = (req,res) => {
  facultyAdd.remove({_id:req.params.id})
             .then(()=>{
               res.redirect('/list-of-faculties')
             })
}
const otp = function(req,res){
  facultyAdd.findOne({
    Femail: req.body.teacher
  },(err,facultyAdd)=>{
    data = facultyAdd;
    if(data.Fposition==='HOD'){
      res
      .status(404)
      .redirect('error');
    }
    else{
      if(!facultyAdd){
        res
        .status(404)
        .redirect('error');
      }
      else{
          const contactNumber = data.Fcontact;
          const senderId = "KARUPS";
          sendOtp.send(contactNumber, senderId, (err, data, response) => {
          if(err) {
            console.log(err);
            return;
          }
          else{
            res
            .status(201)
            .render('otp');
          }
        });
      }
    }
  });
};

const verifyOtp = function(req,res){
  // console.log(data.Fcontact);
  var contactNumber = data.Fcontact;
  const otp = req.body.otp;
  sendOtp.verify(contactNumber, otp, (err, Vdata) => {
    if(Vdata.type!='success') {
      res
      .status(404)
      .redirect('error');
    }
    else{
      // console.log(data.Fposition);
      if(data.Fposition=='HOD'){
      res
        .status(200)
        .render('HOD');
      }
      else{
        res
          .status(201)
          .render('teacher');
      }
    }
  });
};
const findtable = function(req,res){
  sendTimetables.findOne({
    // Stream: req.body.stream,
    // section: req.body.section,
    // Year: req.body.year,
    id: req.body.section
  },(err,sendTimetables)=>{
    data = sendTimetables;
    console.log(data.id);
    if(!sendTimetables){
      res
      .status(404)
      .render('error');
    }
    else{
      res
      .status(201)
      .redirect('/showtimetable/'+data.section);
    }
  })
};
const search = function(req,res){
  var staff=[];
  // console.log(req.body.search);
  facultyAdd.find({
    Fsubject: req.body.search.toUpperCase()
  },(err,facultyAdd)=>{
    // facultyAdd.Fsubject.split
    staff = facultyAdd;
    // console.log(staff);
    if(staff.length==0){
      res
      .status(404)
      .render('error');
    }
    else{
      res
      .status(201)
      .render('listoffaculties',{staff});
    }
  })
}
const otp1 = function(req,res){
  // console.log(req.body.hodmail);
  // console.log(req.params);
  req.session.user = req.body.hodmail;
  facultyAdd.findOne({
    Femail: req.body.hodmail  
  },(err,facultyAdd)=>{
    data = facultyAdd;
    // console.log(data.Fposition);
    if(!facultyAdd){
      res
      .status(404)
      .redirect('error');
    }
    if(data.Fposition!=='HOD'){
      res
      .status(404)
      .redirect('error');
    }
    else if(req.session.user){
    
      // else{
          const contactNumber = data.Fcontact;
          const senderId = "KARUPS";
          sendOtp.send(contactNumber, senderId, (err, data, response) => {
          if(err) {
            console.log(err);
            return;
          }
          else{
            res
            .status(201)
            .render('otp');
          }
        });
      }
    // }
  });
};
module.exports = {
  index,
  timeTable,
  sendtimetable,
  facultiesList,
  showAllFaculties,
  editFaculties,
  updateFaculties,
  removeFaculties,
  showTeacher,
  // teacher,
  // hod,
  uploadFiles,
  showFilesData,
  venueList,
  showAllVenues,
  sectionsList,
  beforeTimetableForm,
  showSectionData,
  showSectionRequirements,
  showListOfRequirements,
  formBeforeTimetable,
  otp,
  verifyOtp,
  findtable,
  otp1,
  search,
  findtimetable,
  findtable
};
